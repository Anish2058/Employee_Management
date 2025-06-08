package org.employee.controller;

import org.employee.model.User;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import java.util.*;

@RestController
@RequestMapping("/api/users")

@CrossOrigin(origins = "http://localhost:5173") //to accept request from front end running at local host port 5173

public class UserController {

    private Map<Long,User> EmployeeDB=new HashMap<>();
    private Long idCounter = 1L;

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
        user.setId(idCounter++);
        EmployeeDB.put(user.getId(), user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }




    @GetMapping
    public List<User>getUsers(){
        return new ArrayList<>(EmployeeDB.values());
    }

    //PUT - Update user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody User updatedUser) {
        User existingUser = EmployeeDB.get(id);
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }
        updatedUser.setId(id);
        EmployeeDB.put(id, updatedUser);
        return ResponseEntity.ok(updatedUser);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        User existingUser = EmployeeDB.get(id);
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }
        EmployeeDB.remove(id);
        return ResponseEntity.noContent().build();
    }
}
