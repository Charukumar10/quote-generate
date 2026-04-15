import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import java.io.ByteArrayInputStream;

@PostConstruct
public void init() {
    try {
        String firebaseConfig = System.getenv("FIREBASE_KEY");

        GoogleCredentials credentials = GoogleCredentials
                .fromStream(new ByteArrayInputStream(firebaseConfig.getBytes()));

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(credentials)
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }

        System.out.println("Firebase connected!");

    } catch (Exception e) {
        e.printStackTrace();
    }
}