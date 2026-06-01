package com.eventhub.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.ArrayList;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String upcomingDate;

    private String upcomingTime;

    private LocalDateTime eventDateTime;

    private String locationName;

    private String description;

    private BigDecimal pricePerTicket;

    private int maxTickets;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Reservation> reservations;

    @ElementCollection
    private List<String> tags = new ArrayList<>();

    public Event() {}

    public Event(String name, String upcomingDate, String upcomingTime,
                 String locationName, String description,
                 BigDecimal pricePerTicket, int maxTickets) {

        this.name = name;
        this.description = description;
        this.upcomingDate = upcomingDate;
        this.upcomingTime = upcomingTime;
        this.locationName = locationName;
        this.pricePerTicket = pricePerTicket;
        this.maxTickets = maxTickets;

        try {
            DateTimeFormatter dateFormatter =
                    DateTimeFormatter.ofPattern("yyyy-MM-dd");
            DateTimeFormatter timeFormatter =
                    DateTimeFormatter.ofPattern("HH:mm");

            LocalDate date =
                    LocalDate.parse(upcomingDate, dateFormatter);

            LocalTime time =
                    LocalTime.parse(upcomingTime, timeFormatter);

            this.eventDateTime =
                    LocalDateTime.of(date, time);

        } catch (Exception e) {
            this.eventDateTime = null;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPricePerTicket() {
        return pricePerTicket;
    }

    public void setPricePerTicket(BigDecimal pricePerTicket) {
        this.pricePerTicket = pricePerTicket;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    public String getUpcomingDate() {
        return upcomingDate;
    }

    public void setUpcomingDate(String upcomingDate) {
        this.upcomingDate = upcomingDate;
    }

    public String getUpcomingTime() {
        return upcomingTime;
    }

    public void setUpcomingTime(String upcomingTime) {
        this.upcomingTime = upcomingTime;
    }

    public LocalDateTime getEventDateTime() {
        return eventDateTime;
    }

    public void setEventDateTime(LocalDateTime eventDateTime) {
        this.eventDateTime = eventDateTime;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public int getMaxTickets() {
        return maxTickets;
    }

    public void setMaxTickets(int maxTickets) {
        this.maxTickets = maxTickets;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}
