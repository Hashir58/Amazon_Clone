import math

def menu():
    print("\nChoose a conversion:")
    print("1. Meter to Kilometer")
    print("2. Kilometer to Meter")
    print("3. Centimeter to Meter")
    print("4. Centimeter to Millimeter")
    print("5. Quit")
    
    choice = int(input("Enter your choice 1-5 : "))
    return choice

    print("")

    
def meterToKilometer():
    num = float(input("\nEnter Meters : "))
    num = num / 1000
    print("Meter to Kilometer: ", num, "km")
    print("")

def kilometerToMeter():
    num = float(input("\nEnter Kilometers : "))
    num = num * 1000
    print("Kilometer to Meter: ", num, "m")
    print("")

def centimeterToMeter():
    num = float(input("\nEnter Centimeters : "))
    num = num / 100
    print("Centimeter to Meter: ", num, "m")
    print("")

def centimeterToMillimeter():
    num = float(input("\nEnter Centimeters : "))
    num = num * 10
    print("Centimeter to Millimeter : ", num, "mm")
    print("")


while True:
    user_choice = menu()

    if user_choice == 1:
        meterToKilometer()
    elif user_choice == 2:
        kilometerToMeter()
    elif user_choice == 3:
        centimeterToMeter()
    elif user_choice == 4:
        centimeterToMillimeter()
    elif user_choice == 5:
        print("Exit")
        break
    else:
        print("Choose Btw 1-5 \n")
