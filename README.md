# Vinyl-fy
http://vinylfy.herokuapp.com/.

## Introduction
Vinylfy is a web application which generates a customized vinyl cover for users, based on their Spotify listening preferences within the past month. 

This application takes into account a user's top artists, tracks, and calculates the averages of a user's top 10 track features including:

- **Danceability**: Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.

- **Energy**: Energy represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.

- **Key**: The key the track is in. Integers map to pitches using standard Pitch Class notation.

- **Loudness**: The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude).

- **Mode**: Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived.

- **Speechiness**: Speechiness detects the presence of spoken words in a track. The more exclusively speech-like recordings may include talk shows, audio books, poetry, etc.

- **Acousticness**: A confidence measure of whether the track is acoustic.

- **Instrumentalness**: Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". 

- **Liveness**: Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live.

- **Valence**: A measure describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).

- **Tempo**: The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.

## Customization Guide

### 1. Vinyl Cover Colour
The colour of a user's vinyl cover is generated based on their most listened to genre, calculated from a user's top 10 artists.

Taking inspiration from research and genre-visualization data from:
- [Visualising Music The Problems With Genre Classification](https://mastersofmedia.hum.uva.nl/blog/2011/04/26/visualising-music-the-problems-with-genre-classification/#:~:text=Rock%20is%20red%2C%20metal%20is,Light%20grey%20vertices%20are%20unclassified).
- 


The following colour-genre assignments were developed:
- ![#1b1121](https://placehold.co/15x15/1b1121/1b1121.png) `Purple`: R&B
- ![#977fa5](https://placehold.co/15x15/977fa5/977fa5.png) `Lavender`: Classical, Opera, Piano
- ![#c29ba6](https://placehold.co/15x15/c29ba6/c29ba6.png) `Pink`: Jazz, Blues, Bossanova, 
- ![#C0C0C0](https://placehold.co/15x15/C0C0C0/C0C0C0.png) `Silver`: Electronic, Dubstep, EDM, Techno, House, Club, Dance, Party
- ![#181c3d](https://placehold.co/15x15/181c3d/181c3d.png) `Dark Blue`: Hip-Hop, Rap
- ![#628aca](https://placehold.co/15x15/628aca/628aca.png) `Sky Blue`: Pop, K-pop 
- ![#6c929e](https://placehold.co/15x15/6c929e/6c929e.png) `Teal`: Ambient
- ![#9aae7c](https://placehold.co/15x15/9aae7c/9aae7c.png) `Green`: Alternative, Indie, Indie-pop, Psych
- ![#cabf78](https://placehold.co/15x15/cabf78/cabf78.png) `Yellow`: Country, Bluegrass
- ![#db9f66](https://placehold.co/15x15/db9f66/db9f66.png) `Orange`: Soul, Funk, Groove
- ![#470e0e](https://placehold.co/15x15/470e0e/470e0e.png) `Crimson`: Rock, Punk, Goth, Grindcore, Metal
- ![#7d5f52](https://placehold.co/15x15/7d5f52/7d5f52.png) `Brown`: Gospel
- ![#555](https://placehold.co/15x15/555/555.png) `Grey`: Other


### 2. Vinyl Front Design Colours


### 3. Vinyl Tracklist Outline

Outline Styles:
- Solid
- Dashed
- Dotted
- Double

