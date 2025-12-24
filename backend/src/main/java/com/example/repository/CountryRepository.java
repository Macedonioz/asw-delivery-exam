package com.example.repository;

import com.example.model.Country;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Repository interface for {@link Country} document persistence.
 * Interface is automatically implemented at runtime by Spring Data MongoDB,
 * using JDK Dynamic Proxy pattern. 
 * The proxy intercepts calls to inherited methods and translates them into
 * MongoDB-specific BSON queries.
 */
@Repository
public interface CountryRepository extends MongoRepository<Country, String> {

    List<Country> findByNameContainingIgnoreCase(String name);
}