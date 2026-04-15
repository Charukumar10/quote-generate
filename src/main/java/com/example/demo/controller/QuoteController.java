package com.example.demo.controller;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class QuoteController {

    // 🔥 GET ALL QUOTES
    @GetMapping("/all-quotes")
    public List<Map<String, Object>> getAllQuotes() throws Exception {

        Firestore db = FirestoreClient.getFirestore();
        List<Map<String, Object>> quotes = new ArrayList<>();

        db.collection("quotes").get().get().getDocuments().forEach(doc -> {
            Map<String, Object> data = doc.getData();
            data.put("id", doc.getId());
            quotes.add(data);
        });

        return quotes;
    }

    // 🔥 GET RANDOM QUOTE
    @GetMapping("/random-quote")
    public Map<String, Object> getRandomQuote() throws Exception {

        Firestore db = FirestoreClient.getFirestore();
        List<Map<String, Object>> quotes = new ArrayList<>();

        db.collection("quotes").get().get().getDocuments().forEach(doc -> {
            Map<String, Object> data = doc.getData();
            data.put("id", doc.getId());
            quotes.add(data);
        });

        if (quotes.isEmpty()) {
            return Map.of("text", "No quotes available");
        }

        Random rand = new Random();
        return quotes.get(rand.nextInt(quotes.size()));
    }

    // 🔥 ADD QUOTE
    @PostMapping("/add-quote")
    public String addQuote(@RequestBody Map<String, String> data) throws Exception {

        Firestore db = FirestoreClient.getFirestore();

        Map<String, Object> quote = new HashMap<>();
        quote.put("text", data.get("text"));

        db.collection("quotes").add(quote);

        return "Quote added!";
    }

    // 🔥 UPDATE QUOTE
    @PutMapping("/update-quote/{id}")
    public String updateQuote(@PathVariable String id,
                             @RequestBody Map<String, String> data) throws Exception {

        Firestore db = FirestoreClient.getFirestore();

        db.collection("quotes")
          .document(id)
          .update("text", data.get("text"));

        return "Quote updated!";
    }

    // 🔥 DELETE QUOTE
    @DeleteMapping("/delete-quote/{id}")
    public String deleteQuote(@PathVariable String id) throws Exception {

        Firestore db = FirestoreClient.getFirestore();

        db.collection("quotes")
          .document(id)
          .delete();

        return "Quote deleted!";
    }
}