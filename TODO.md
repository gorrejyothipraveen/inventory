# board plan

=> normal memory (no database)
there are four operations
1.init
2.list
3.add
4.update


# architecture :

an object as database which contains a key tables
tables itself contain contains some keys means individual tables 
and each table contain records as object of arrays

# contract 

1.init - initializing the table // takes nothing if exists it does not throw any error 
2.list - retrieves the records // display the contents in the table
3.add - insert the data // name , category ,  quantity
4.update - updates the data // id, quantity


