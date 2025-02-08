from machine import Pin, ADC, PWM
import utime
import urequests

# pins, change to what we are using
temp_sensor = ADC(4)
light_sensor = ADC(26)
fan = Pin(15, Pin.OUT)
led = PWM(Pin(14))
buzzer = PWM(Pin(13))

# temp constants and conversions, change if needed
TEMP_CONVERSION = 3.3 / (65535)
TEMP_THRESHOLD = 25.0
LIGHT_THRESHOLD = 20000

# server stuff
SERVER_URL = "fill this when we have a website online"

def read_temperature():
    voltage = temp_sensor.read_u16() * TEMP_CONVERSION
    temperature = 27 - (voltage - 0.706) / 0.001721
    return temperature

def read_light():
    return light_sensor.read_u16()

def control_fan(temp):
    if temp > TEMP_THRESHOLD:
        fan.value(1)
    else:
        fan.value(0)

def control_led(light):
    if light < LIGHT_THRESHOLD:
        led.duty_u16(65535)  # full
    else:
        led.duty_u16(0)  # off

def play_music():
    buzzer.freq(1000)
    buzzer.duty_u16(30000) # activate 
    utime.sleep(1)
    buzzer.duty_u16(0) # off

def send_data(temp, light):
    try:
        data = {"temperature": temp, "light": light}
        response = urequests.post(SERVER_URL, json=data)
        response.close()
    except Exception as e:
        print("Error sending data:", e)

while True:
    temp = read_temperature()
    light = read_light()
    
    control_fan(temp)
    control_led(light)
    
    send_data(temp, light)
    
    utime.sleep(10)  # adjust delay
