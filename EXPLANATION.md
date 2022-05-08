## Getting Started

1. Make sure you are in the root of the directory.
2. Install dependencies with:
   > `yarn install`
3. View the results with:
   > `yarn start`

## Thought Process

- My first goal is to order all the tree nodes in their proper hiearchy.

- This whole assessment seems to be revolved around recursion. I typically solve recursion problems by making a helper function that does all the work because it has access to the outer scope without being reset.

- In order to do this, I will need to get the root node and chain everything down from it. I'm assuming that there will only be one node that doesn't have a boss, and that will be the root node, in this, case, Sarah the CEO.

- In my Tree Node class, I will create a method that will check all the employee's names in case it is an email address and correct it. The trick is to invoke it in the constructor so everytime we instantiate a new Tree Node, we will check and if need to, correct the name.

- Once I have generated the company structure, I will complete all the getters first because they could aid me in implementing the functionalities in the manageEmployee file.

- The getBoss function seems to be tricky because I need to traverse down the tree until I found the employee node which in turn, will give me the name of their boss, but then I have to go back up to find the boss node asscoiated with the employee's boss. If it were a doubly linked list, I could easily access this. However, this is a tree so I'll just create another helper function that'll split the work. Once I traverse down and get boss name I'm looking for, I'll plug that into my helper function and traverse from the top down until I found the boss node I'm looking for.

- Utilizing the getBoss function will greatly aid me in implementing the other functionalities as I predicted.

- When a boss swaps positions with their subordinate, I'm going to assume that the swapped subordinate will have the former boss' job title and salary.

## Room for improvements

- If I had more time, I would've tried to make my code more DRY. With recursion, it can get a little messy for sure, so maybe I could've made a helper function that traverses down the tree until it finds what it's looking for because I repeated that part alot throughout different functions.

- I could've eliminated the explicit return types in all my functions because typescript does a good job inferring them but I wanted my code to be very clear for whoever is reading it.

- I could've also checked if these employees actually existed and if not, return a specific message saying that the employee doesn't exist.

## Bonus

- The two functions that have similar logic are promoteEmployee and demoteEmployee. The both have the same effect which is, swapping the positions of the subordinate and his/her boss.
