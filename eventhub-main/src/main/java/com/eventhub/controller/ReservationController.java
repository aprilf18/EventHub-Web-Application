package com.eventhub.controller;

import com.eventhub.model.Event;
import com.eventhub.model.Reservation;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private EventRepository eventRepository;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        return eventRepository.findById(reservation.getEvent().getId())
                .map(event -> {
                    reservation.setEvent(event);
                    Reservation savedReservation = reservationRepository.save(reservation);
                    return ResponseEntity.ok(savedReservation);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/event/{eventId}")
    public List<Reservation> getReservationsByEventId(@PathVariable Long eventId) {
        return reservationRepository.findAll().stream()
                .filter(r -> r.getEvent().getId().equals(eventId))
                .toList();
    }
}
