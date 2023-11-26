package com.takima.backskeleton.utils;

import java.security.SecureRandom;
import java.util.Base64;

public class RandomStringGenerator {
    public static void main(String[] args) {
        String randomString = generateRandomString(200);
        System.out.println("Chaîne aléatoire : " + randomString);
    }

    public static String generateRandomString(int length) {
        SecureRandom secureRandom = new SecureRandom();
        byte[] randomBytes = new byte[length];
        secureRandom.nextBytes(randomBytes);

        // Convertir en chaîne de caractères encodée en base64
        return Base64.getUrlEncoder().encodeToString(randomBytes);
    }
}
