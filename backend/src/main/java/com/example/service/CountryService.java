package com.example.service;

import com.example.model.Country;
import com.example.repository.CountryRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public List<Country> findAll() {
        return countryRepository.findAll();
    }

    public Country save(Country country) {
        return countryRepository.save(country);
    }

    public List<Country> findByName(String name) {
        return countryRepository.findByNameContainingIgnoreCase(name);
    }
}