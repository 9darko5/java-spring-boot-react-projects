package com.demo.emsbackend.helpers;

import java.util.List;
import java.util.StringJoiner;

public class StringUtils {
    public static String ListToCSV(List<String> input){
        if (input == null || input.isEmpty()) {
            return "";
        }

        StringJoiner joiner = new StringJoiner(",");
        for (String item : input) {
            joiner.add(item);
        }

        return joiner.toString();
    }
}
