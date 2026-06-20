package com.ai.Resume.analyser.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class resultsDto {
    private Long id;
    private String roles;


    private  int score;
    private int atsoptimizationscore;
    private List<String> pros;
    private List<String> cons;
    private List<String> suggestions;
    private List<Job>  jobs;

}
