package com.example.model;

import java.util.List;
import java.util.Map;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "countries")
public class Country {

  @Id private String id;

  private double area;
  private List<String> borders;
  private String capital;
  private List<String> currency;
  private String demonym;
  private Map<String, String> languages; // ISO -> language name
  private List<Double> latlng;
  private String name;
  private String region;
  private String subregion;

  public Country() {}

  /*          Getter && Setter          */

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public double getArea() {
    return area;
  }

  public void setArea(double area) {
    this.area = area;
  }

  public List<String> getBorders() {
    return borders;
  }

  public void setBorders(List<String> borders) {
    this.borders = borders;
  }

  public String getCapital() {
    return capital;
  }

  public void setCapital(String capital) {
    this.capital = capital;
  }

  public List<String> getCurrency() {
    return currency;
  }

  public void setCurrency(List<String> currency) {
    this.currency = currency;
  }

  public String getDemonym() {
    return demonym;
  }

  public void setDemonym(String demonym) {
    this.demonym = demonym;
  }

  public Map<String, String> getLanguages() {
    return languages;
  }

  public void setLanguages(Map<String, String> languages) {
    this.languages = languages;
  }

  public List<Double> getLatlng() {
    return latlng;
  }

  public void setLatlng(List<Double> latlng) {
    this.latlng = latlng;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getRegion() {
    return region;
  }

  public void setRegion(String region) {
    this.region = region;
  }

  public String getSubregion() {
    return subregion;
  }

  public void setSubregion(String subregion) {
    this.subregion = subregion;
  }
}
