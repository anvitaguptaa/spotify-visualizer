import spotipy
from dotenv import load_dotenv
import os
import sys
import spotipy
from spotipy import oauth2
import spotipy.util as utils
from flask import Flask, render_template


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
        self.top_track_info = {'track_arr' : [], 'id_arr' : []}


    def save_track_info(self):
        top_tracks = self.client.current_user_top_tracks(time_range='long_term')

        for track in top_tracks['items']:
            self.top_track_info['track_arr'].append(track['name'].upper() + ' - ' + track['artists'][0]['name'].upper())
            self.top_track_info['id_arr'].append(track['id'])
            
        # print(self.top_track_info)
        # print(self.client.audio_features('22gXA7HlEd0z13zdc3hju7'))


if __name__ == "__main__":
    client = Client()
    client.save_track_info()
    top_tracks = client.top_track_info['track_arr']


@app.route('/')
def hello():
    client = Client()
    client.save_track_info()
    top_tracks = client.top_track_info['track_arr']
    return render_template('index.html', top_tracks=top_tracks)