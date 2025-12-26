package com.example.controller;

import com.example.model.Country;
import com.example.service.CountryService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
@CrossOrigin(origins = "*")                     // TODOmodify URL to match frontend
public class CountryController {
   private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public ResponseEntity<List<Country>> findAll() {
        return ResponseEntity.ok(countryService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Country> findById(@PathVariable String id) {
        return ResponseEntity.ok(countryService.findById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Country>> find(@RequestParam String name) {
        return ResponseEntity.ok(countryService.findByName(name));
    }

    @PostMapping
    public ResponseEntity<Country> create(@RequestBody Country country) {
        Country saved = countryService.save(country);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Country> update(@PathVariable String id, @RequestBody Country details) {
        return ResponseEntity.ok(countryService.update(id, details));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        countryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}