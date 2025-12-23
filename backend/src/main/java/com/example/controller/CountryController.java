package com.example.controller;

import com.example.model.Country;
import com.example.service.CountryService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

// TODOadd Global Exception handler @RestControllerAdvice, @valid tag as well

@RestController
@RequestMapping("/api/countries")
@CrossOrigin(origins = "*")                     // TODOmodify URL to match frontend
public class CountryController {
    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;                   // Constructor Injection
    }

    @GetMapping
    public ResponseEntity<List<Country>> getAllCountries() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }

    @PostMapping
    public ResponseEntity<Country> createCountry(@RequestBody Country country) {
        Country savedCountry = countryService.saveCountry(country);
        return ResponseEntity.status(201).body(savedCountry);
    }
}