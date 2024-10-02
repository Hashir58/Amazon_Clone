import numpy as np 

my_array2d = np.array([ [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12] ]) 
# 3 x 4 array of ones 
ones_2d = np.ones([3, 4]) 
print(ones_2d) 

# 3 x 4 array of ones with random noise 
ones_noise = ones_2d + .01*np.random.randn(3, 4) 
print(ones_noise)

 # 3 x 3 identity matrix 
my_identity = np.eye(3) 
print(my_identity)  
