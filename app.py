import spotipy
from dotenv import load_dotenv
import os
import sys
import spotipy
from spotipy import oauth2
import spotipy.util as utils
from flask import Flask, render_template
import re

load_dotenv('credentials.env')
app = Flask(__name__)

CLIENT_SECRET = os.getenv('SPOTIPY_CLIENT_SECRET')
CLIENT_ID = os.getenv('SPOTIPY_CLIENT_ID')
REDIRECT_URI = os.getenv('SPOTIPY_REDIRECT_URI')
USERNAME = 'av_pr'
SCOPE = '''user-top-read user-read-playback-state user-read-recently-played 
           user-follow-read playlist-read-private'''
URL = 'https://api.spotify.com/v1/'


def oauth_token():
    token = utils.prompt_for_user_token(USERNAME, SCOPE, CLIENT_ID,
                                       CLIENT_SECRET, REDIRECT_URI)

    return token


def make_headers(token):
    headers = {'Authorization': 'Bearer ' + token}

    return headers


class Client:
    def __init__(self):
        self.token = oauth_token()
        self.headers = make_headers(self.token)
        self.client = spotipy.Spotify(auth=self.token)
        self.name = self.client.current_user()['display_name']
        self.top_track_info = {'track_arr' : [], 'id_arr' : []}
        self.features_info = {'danceability' : 0, 'energy' : 0, 'key' : 0, 'loudness' : 0, 
                              'mode' : 0, 'speechiness' : 0, 'acousticness' : 0, 
                              'instrumentalness' : 0, 'liveness' : 0, 'valence' : 0, 'tempo' : 0}
        self.top_artist_info = {}
        self.genres_regex = '(rap|hip hop)|(pop)|(r&b)|(indie|alternative|psych)|(soul|funk)|(rock|metal)|(country|folk)|(gospel)|(ambient|romance|sad|study|chill|happy)|(electronic|edm|dubstep|techno|house)|(classical|piano|opera)|(jazz|blues|bossa nova)'
        # self.genres_regex = 'rap|hip\shop|pop|r&b|indie|alternative|psych|soul|funk|rock|metal|country|folk|gospel|ambient|romance|sad|study|chill|happy|electronic|edm|dubstep|techno|house|classical|piano|opera|jazz|blues|bossa\snova'
        self.genre_matches = {'rap' : 0, 'pop' : 0, 'r&b' : 0, 'indie' : 0, 'jazz' : 0, 
                              'soul' : 0, 'rock' : 0, 'country' : 0, 'gospel' : 0, 
                              'ambient' : 0, 'electronic' : 0, 'classical' : 0, 'jazz' : 0, 'other' : 0}


    def parse_track_info(self):
        top_tracks = self.client.current_user_top_tracks(limit=10, time_range='long_term')

        for track in top_tracks['items']:
            self.top_track_info['track_arr'].append(track['name'].upper() + ' - ' + track['artists'][0]['name'].upper())
            self.top_track_info['id_arr'].append(track['id'])
            

    def parse_features_info(self):        
        for id in self.top_track_info['id_arr']:
            features = self.client.audio_features(id)
            
            for key, value in features[0].items():
                if not key in self.features_info: 
                    break

                self.features_info[key] += value

        for feature in self.features_info.keys():
            self.features_info[feature] /= 10


    def parse_artists_info(self):
        top_artists = self.client.current_user_top_artists(limit=20, time_range='long_term')

        for artist in top_artists['items']:
            self.top_artist_info[artist['name']] = artist['genres']

        # print(self.top_artist_info)

        # print(self.client.recommendation_genre_seeds())


    def get_top_genre(self):
        artist_genres = str(list(self.top_artist_info.values())[0])
        # print(artist_genres)

        result = re.findall(self.genres_regex, artist_genres)
        print(result)
        # result = re.search(self.genres_regex, artist_genres)
        # print(result.group())
        # print(result.groups())
        



if __name__ == "__main__":
    client = Client()
    client.parse_track_info()
    client.parse_features_info()
    top_tracks = client.top_track_info['track_arr']
    client.parse_artists_info()
    client.get_top_genre()

    # print(client.features_info)


@app.route('/')
def hello():
    client = Client()
    name = client.name.upper()
    client.parse_track_info()
    client.parse_features_info()
    top_tracks = client.top_track_info['track_arr']
    return render_template('index.html', name=name, top_tracks=top_tracks)
