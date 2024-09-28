import math

class BasicCalc:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def add(self):
        return self.x + self.y

    def subtract(self):
        return self.x - self.y

    def multiply(self):
        return self.x * self.y

    def divide(self):
        if self.y != 0:
            return self.x / self.y
        else:
            return "Error: Cannot divide by 0"



class SCalc(BasicCalc):
    def power(self):
        return self.x ** self.y

    def factorial(self):
        return math.factorial(self.x) , math.factorial(self.y)


    def log(self):
        return math.log10(self.x), math.log10(self.y)


    def ln(self):
        return math.log(self.x), math.log(self.y)



x = int(input("Enter the first integer: "))
y = int(input("Enter the second integer: "))

calc_obj = SCalc(x, y)


print("Addition:", calc_obj.add())
print("Subtraction:", calc_obj.subtract())
print("Multiplication:", calc_obj.multiply())
print("Division:", calc_obj.divide())
print(f"{x} raised to the power {y}:", calc_obj.power())
print(f"Factorial of {x} and {y}:", calc_obj.factorial())
print(f"Logarithm base 10 of {x} and {y}:", calc_obj.log())
print(f"Natural log of {x} and {y}:", calc_obj.ln())