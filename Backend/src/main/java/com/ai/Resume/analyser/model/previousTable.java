package com.ai.Resume.analyser.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class previousTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    private int score;
    private int atsoptimizationscore;
    private String roles;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(columnDefinition="MEDIUMBLOB")
    private byte[] resumeFile;

    private String fileType;

    @ElementCollection
    @Column(length = 450)
    private List<String> pros;

    @ElementCollection
    @Column(length = 450)
    private List<String> cons;

    @ElementCollection
    @Column(length = 450)
    private List<String> suggestions;

    @CreationTimestamp
    @Column(updatable = false)
    private Date scannedAt;

    public previousTable(String userEmail, int score, int atsoptimizationscore, String roles, byte[] resumeFile, String fileType, List<String> pros, List<String> cons, List<String> suggestions) {
        this.userEmail = userEmail;
        this.score = score;
        this.atsoptimizationscore = atsoptimizationscore;
        this.roles = roles;
        this.resumeFile = resumeFile;
        this.fileType = fileType;
        this.pros = pros;
        this.cons = cons;
        this.suggestions = suggestions;
    }
}
