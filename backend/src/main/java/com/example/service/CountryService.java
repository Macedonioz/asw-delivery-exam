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

    public Country update(String id, Country details) {
    return countryRepository.findById(id)
        .map(existing -> {                              // Fetch & Map
            existing.setName(details.getName());
            existing.setCapital(details.getCapital());
            existing.setRegion(details.getRegion());
            existing.setSubregion(details.getSubregion());
            existing.setDemonym(details.getDemonym());
            existing.setArea(details.getArea());
            existing.setBorders(details.getBorders());
            existing.setCurrency(details.getCurrency());
            existing.setLatlng(details.getLatlng());
            existing.setLanguages(details.getLanguages());
            
            return countryRepository.save(existing);
        })
        .orElseThrow(() -> new RuntimeException("Country not found with id: " + id));
    }

    public void delete(String id) {
        if (!countryRepository.existsById(id)) {
            throw new RuntimeException("Country not found with id: " + id);
        }
        countryRepository.deleteById(id);
    }
}