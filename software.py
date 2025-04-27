import network
import time
import urequests
import dht
from machine import Pin, PWM
from neopixel import NeoPixel

SSID = "Zyxel760ec6"
PASSWORD = "K79TTVX94PM3N"

buzzer = PWM(Pin(27))
led_pin = Pin(1, Pin.OUT)
num_leds = 4
heater_relay = Pin(28, Pin.OUT)
dht_sensor = dht.DHT11(Pin(0))
cooler_relay = Pin(13, Pin.OUT)
np = NeoPixel(led_pin, num_leds)


PRESETS = {
    "cold": {"temp": 15, "led_color": (0, 0, 255), "buzzer_freq": 200},
    "normal": {"temp": 20, "led_color": (255, 255, 0), "buzzer_freq": 500},
    "warm": {"temp": 25, "led_color": (255, 69, 0), "buzzer_freq": 800}
}

current_preset = "warm"

# Endpoints
API_SEND_URL = "http://143.244.198.80:5000/sensor/data"
API_GET_PRESET_URL = "http://164.92.211.112:5000/preset"


def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(SSID, PASSWORD)
    timeout = 5
    while not wlan.isconnected() and timeout > 0:
        print("Connecting to Wi-Fi...")
        time.sleep(1)
        timeout -= 1

    if wlan.isconnected():
        print("Connected to WiFi:", wlan.ifconfig())
        return True
    else:
        print("Wi-Fi connection failed.")
        return False


def set_led_color(color):
    for i in range(num_leds):
        np[i] = color
    np.write()

def set_buzzer_frequency(freq):
    if freq == 0:
        buzzer.duty_u16(0)
    else:
        buzzer.duty_u16(32768)
        buzzer.freq(freq)

def control_heater(state):
    heater_relay.value(state)

def control_cooler(state):
    cooler_relay.value(state)


def read_dht():
    try:
        dht_sensor.measure()
        return dht_sensor.temperature(), dht_sensor.humidity()
    except Exception as e:
        print("DHT Read Error:", e)
        return None, None

# Apply Preset
def apply_preset(temp, preset_name):
    preset = PRESETS[preset_name]
    set_led_color(preset["led_color"])
    set_buzzer_frequency(preset["buzzer_freq"])
    
    if temp > preset["temp"]:
        control_cooler(1)
        control_heater(0)
        print("Cooling ON")
    elif temp < preset["temp"]:
        control_cooler(0)
        control_heater(1)
        print("Heating ON")
    else:
        control_cooler(0)
        control_heater(0)
        print("Stable Temp")

# Send Data to Flask API
def send_to_server(temp, hum, preset, heater, cooler):
    data = {
        "temperature": temp,
        "humidity": hum,
        "current_preset": preset,
        "heater_status": heater,
        "cooler_status": cooler
    }
    try:
        response = urequests.post(API_SEND_URL, json=data)
        print("POST Response:", response.status_code, response.text)
        response.close()
    except Exception as e:
        print("POST Error:", e)

# Get New Preset from Server
def get_preset_from_server():
    global current_preset
    try:
        response = urequests.get(API_GET_PRESET_URL)
        if response.status_code == 200:
            new_preset = response.json().get("preset")
            if new_preset in PRESETS:
                print(f"Preset changed to: {new_preset}")
                current_preset = new_preset
            else:
                print("Received unknown preset")
        response.close()
    except Exception as e:
        print("GET Error:", e)


if connect_wifi():
    while True:
        temp, hum = read_dht()
        if temp is not None:
            get_preset_from_server()
            apply_preset(temp, current_preset)
            send_to_server(
                temp,
                hum,
                current_preset,
                heater_relay.value(),
                cooler_relay.value()
            )
        time.sleep(10) 
