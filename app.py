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
        self.genres_regex = '(rap|hip hop)|(pop)|(r&b)|(indie|alternative|psych)|(soul|funk)|(rock|metal)|(country|folk)|(gospel)|(ambient|romance|sad|study|chill|happy)|(electronic|edm|dubstep|techno|house)|(classical|piano|opera)|(jazz|blues|bossa nova)|(reggae|samba|afrobeat|latino|salsa)'
        self.genre_matches = {'rap' : 0, 'pop' : 0, 'r&b' : 0, 'indie' : 0, 'soul' : 0, 
                              'rock' : 0, 'country' : 0, 'gospel' : 0, 'ambient' : 0, 
                              'electronic' : 0, 'classical' : 0, 'jazz' : 0, 'reggae' : 0, 'other' : 0}


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
        top_artists = self.client.current_user_top_artists(limit=10, time_range='long_term')

        for artist in top_artists['items']:
            self.top_artist_info[artist['name']] = artist['genres']


    def genre_counter(self, group):
        if group == 0:
            self.genre_matches['rap'] += 1
        elif group == 1:
            self.genre_matches['pop'] += 1
        elif group == 2:
            self.genre_matches['r&b'] += 1
        elif group == 3:
            self.genre_matches['indie'] += 1
        elif group == 4:
            self.genre_matches['soul'] += 1
        elif group == 5:
            self.genre_matches['rock'] += 1
        elif group == 6:
            self.genre_matches['country'] += 1
        elif group == 7:
            self.genre_matches['gospel'] += 1
        elif group == 8:
            self.genre_matches['ambient'] += 1
        elif group == 9:
            self.genre_matches['electronic'] += 1
        elif group == 10:
            self.genre_matches['classical'] += 1
        elif group == 10:
            self.genre_matches['jazz'] += 1
        elif group == 11:
            self.genre_matches['reggae'] += 1
        else:
            self.genre_matches['other'] += 1


    def get_top_genres(self):
        artist_genres = str(list(self.top_artist_info.values())[6])
        result = re.findall(self.genres_regex, artist_genres)

        for matches in result:
            group = 0
            for match in matches:
                if match:
                    self.genre_counter(group)
                else:
                    group += 1

        # TODO: SHOULD I RETURN SINGLE OR MULTIPLE MAX KEYS
        max_keys = [key for key, value in self.genre_matches.items() 
                    if value == max(self.genre_matches.values())]
        print(max_keys)
        return max_keys
        

if __name__ == "__main__":
    client = Client()
    client.parse_track_info()
    client.parse_features_info()
    top_tracks = client.top_track_info['track_arr']
    client.parse_artists_info()
    top_genres = client.get_top_genres()

    # print(client.features_info)

# TODO: Main route has spinning vinyl background 
#   and prompts you to create your personal one which takes you to login etc.
@app.route('/')
def hello():
    client = Client()
    name = client.name.upper()

    client.parse_track_info()
    client.parse_features_info()

    top_tracks = client.top_track_info['track_arr']

    client.parse_artists_info()
    
    top_genres = list(client.get_top_genres())

    return render_template('index.html', name=name, top_tracks=top_tracks, top_genres=top_genres)
