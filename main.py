from machine import Pin, ADC, PWM
import utime
import urequests
import json

temp_sensor = ADC(4)
light_sensor = ADC(26)
fan = Pin(15, Pin.OUT)
led = PWM(Pin(14))
buzzer = PWM(Pin(13))

TEMP_CONVERSION = 3.3 / 65535
LIGHT_THRESHOLD = 20000
DEFAULT_TEMP = 22.5


SERVER_URL = "change to our url"

profiles = {
    "relaxing": {"temperature": 22.0, "color": (0, 0, 255), "duration": 3600},
    "romantic": {"temperature": 24.0, "color": (255, 0, 0), "duration": 5400},
    "cozy": {"temperature": 23.5, "color": (255, 165, 0), "duration": 7200},
    "energizing": {"temperature": 21.0, "color": (0, 255, 0), "duration": 1800},
    "sleep": {"temperature": 20.0, "color": (75, 0, 130), "duration": 28800}
}

def read_temperature():
    voltage = temp_sensor.read_u16() * TEMP_CONVERSION
    return 27 - (voltage - 0.706) / 0.001721

def read_light():
    return light_sensor.read_u16()

def control_fan(temp, target_temp):
    fan.value(1 if temp > target_temp else 0)

def set_led_color(color):
    red, green, blue = color
    led.duty_u16(int((red / 255) * 65535))


def send_data(temp, light, profile):
    try:
        data = {"temperature": temp, "light": light, "profile": profile}
        response = urequests.post(SERVER_URL, json=data)
        response.close()
    except Exception as e:
        print("Error sending data:", e)

def apply_profile(profile_name):
    if profile_name in profiles:
        profile = profiles[profile_name]
        print(f"Applying profile: {profile_name}")
        set_led_color(profile["color"])
        return profile
    else:
        print("Profile not found!")
        return None

def main():
    active_profile = "relaxing"
    profile_settings = apply_profile(active_profile)
    start_time = utime.time()

    while True:
        temp = read_temperature()
        light = read_light()
        control_fan(temp, profile_settings["temperature"])
        send_data(temp, light, active_profile)
        
        if utime.time() - start_time > profile_settings["duration"]:
            pass
        
        utime.sleep(10)

if __name__ == "__main__":
    main()
