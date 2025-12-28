package com.example.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.model.Country;
import com.example.repository.CountryRepository;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CountryServiceTest {

  private static final String MOCK_ID = "123";
  private static final String MOCK_NAME = "TestZest";
  private static final String NOT_FOUND_ID = "999";

  @Mock private CountryRepository countryRepository;

  @InjectMocks private CountryService countryService;

  private Country sampleCountry;

  @BeforeEach
  void setUp() {
    sampleCountry = new Country();
    sampleCountry.setId(MOCK_ID);
    sampleCountry.setName(MOCK_NAME);
  }

  @Test
  void findAll_ShouldReturnList() {
    when(countryRepository.findAll()).thenReturn(Arrays.asList(sampleCountry));

    List<Country> result = countryService.findAll();

    assertEquals(1, result.size());
    assertEquals(MOCK_NAME, result.get(0).getName());
    verify(countryRepository, times(1)).findAll();
  }

  @Test
  void findById_WhenIdExists_ShouldReturnCountry() {
    when(countryRepository.findById(MOCK_ID)).thenReturn(Optional.of(sampleCountry));

    Country result = countryService.findById(MOCK_ID);

    assertNotNull(result);
    assertEquals(MOCK_ID, result.getId());
  }

  @Test
  void findById_WhenIdDoesNotExist_ShouldThrowRuntimeException() {
    // Logic branch: .orElseThrow()
    when(countryRepository.findById(NOT_FOUND_ID)).thenReturn(Optional.empty());

    assertThrows(RuntimeException.class, () -> countryService.findById(NOT_FOUND_ID));
  }

  @Test
  void save_ShouldReturnSavedCountry() {
    when(countryRepository.save(any(Country.class))).thenReturn(sampleCountry);

    Country result = countryService.save(new Country());

    assertEquals(MOCK_NAME, result.getName());
    verify(countryRepository).save(any(Country.class));
  }

  @Test
  void update_WhenIdExists_ShouldUpdateFieldsAndSave() {
    // Logic branch: .map(...)
    Country updates = new Country();
    updates.setName("Updated Name");

    when(countryRepository.findById(MOCK_ID)).thenReturn(Optional.of(sampleCountry));
    when(countryRepository.save(any(Country.class))).thenReturn(sampleCountry);

    Country result = countryService.update(MOCK_ID, updates);

    assertEquals("Updated Name", result.getName());
    verify(countryRepository).save(sampleCountry);
  }

  @Test
  void update_WhenIdDoesNotExist_ShouldThrowRuntimeException() {
    // Logic branch: .orElseThrow() after failed map
    when(countryRepository.findById(NOT_FOUND_ID)).thenReturn(Optional.empty());

    assertThrows(RuntimeException.class, () -> countryService.update(NOT_FOUND_ID, new Country()));
  }

  @Test
  void delete_WhenIdExists_ShouldCallDelete() {
    // Logic branch: if (!existsById) -> false path
    when(countryRepository.existsById(MOCK_ID)).thenReturn(true);

    countryService.delete(MOCK_ID);

    verify(countryRepository).deleteById(MOCK_ID);
  }

  @Test
  void delete_WhenIdDoesNotExist_ShouldThrowRuntimeException() {
    // Logic branch: if (!existsById) -> true path (exception)
    when(countryRepository.existsById(NOT_FOUND_ID)).thenReturn(false);

    assertThrows(RuntimeException.class, () -> countryService.delete(NOT_FOUND_ID));
  }
}
