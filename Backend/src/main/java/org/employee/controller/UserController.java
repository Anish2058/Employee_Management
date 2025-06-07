package org.employee.controller;

import org.employee.model.User;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users")

@CrossOrigin(origins = "http://localhost:5175") //to accept request from front end running at local host port 5173

public class UserController {

    private Map<Long,User> EmployeeDB=new HashMap<>();
    private Long idCounter = 1L;

    @PostMapping
    public Map<String, Object> addUser(@RequestBody User user) {
        user.setId(idCounter++);
        EmployeeDB.put(user.getId(), user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Employee added");
        response.put("id", user.getId());
        return response;
    }



    @GetMapping
    public List<User>getUsers(){
        return new ArrayList<>(EmployeeDB.values());
    }

    //PUT - Update user
    @PutMapping("/{id}")
    public String updateUser(@PathVariable Long id, @RequestBody User user){
        if(!EmployeeDB.containsKey(id)){
            return "Employee not found";
        }

        user.setId(id);
        EmployeeDB.put(id, user);
        return "Employee updated";
    }

    //DELETE - Delete user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id){
        if(EmployeeDB.remove(id) !=null){
            return "Employee Deleted";
        }
        return "Employee not found";
    }
}
