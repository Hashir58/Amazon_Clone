import math

def menu():
    print("\nChoose an operation:")
    print("1. Addition")
    print("2. Subtraction")
    print("3. Multiplication")
    print("4. Division")
    print("5. Power (x^y)")
    print("6. Factorial ")
    print("7. Logarithm base 10 (log)")
    print("8. Natural Logarithm (ln)")
    print("9. Quit")
    
    choice = int(input("\nEnter your choice 1-9 :  "))
    print("")
    return choice

class Calc:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def sum(self):
        return self.x + self.y

    def sub(self):
        return self.x - self.y

    def mul(self):
        return self.x * self.y

    def div(self):
        if self.y != 0:
            return self.x / self.y
        else:
            return "Error, Cannot divide by 0"

    def power(self):
        return self.x ** self.y

    def factorial(self):
        return math.factorial(self.x) , math.factorial(self.y)


    def log(self):
        return math.log10(self.x), math.log10(self.y)


    def ln(self):
        return math.log(self.x), math.log(self.y)



def declare_var():
    x = int(input("\n Enter the first integer : "))
    y = int(input("\n Enter the second integer : "))
    
    return Calc(x, y)

while True:

    user_choice = menu()

    if user_choice == 1:
        calc_obj = declare_var()
        print("Sum : ", calc_obj.sum())
        print("")
    elif user_choice == 2:
        calc_obj = declare_var()
        print("Subtract : ", calc_obj.sub())
        print("")
    elif user_choice == 3:
        calc_obj = declare_var()
        print("Multiply : ", calc_obj.mul())
        print("")
    elif user_choice == 4:
        calc_obj = declare_var()
        print("Divide : ", calc_obj.div())
        print("")
    elif user_choice == 5:
        calc_obj = declare_var()
        print(f"{calc_obj.x} raised to the power {calc_obj.y} : ", calc_obj.power())
        print("")
    elif user_choice == 6:
        calc_obj = declare_var()
        print(f"Factorial of {calc_obj.x} and {calc_obj.y} : ", calc_obj.factorial())
        print("")
    elif user_choice == 7:
        calc_obj = declare_var()
        print(f"Log base 10 of {calc_obj.x} and {calc_obj.y} : ", calc_obj.log())
        print("")
    elif user_choice == 8:
        calc_obj = declare_var()
        print(f"Natural log of {calc_obj.x} and {calc_obj.y} : ", calc_obj.ln())
        print("")
    elif user_choice == 9:
        print("Exit")
        break
    else:
        print("Choose Btw 1-9 \n")
