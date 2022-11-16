import spotipy
from dotenv import load_dotenv
import os
import sys
import spotipy
from spotipy import oauth2
import spotipy.util as utils


load_dotenv('credentials.env')
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


token = oauth_token()
headers = make_headers(token)
sp = spotipy.Spotify(auth=token)


# Spotify API calls and data manipulation
# Save for later to be read by other workflows
# print("Getting, transforming, and saving top artist data...")
# top_artists = sp.current_user_top_artists()



# print("Getting, transforming, and saving followed artist data...")
# followed_artists = offset_api_limit(sp, sp.current_user_followed_artists())
# followed_artists_df = get_artists_df(followed_artists)
# followed_artists_df.to_pickle("spotify/followed_artists.pkl")


# print("Getting, transforming, and saving top track data...")
top_tracks = sp.current_user_top_tracks()
tracks_arr = []
for track in top_tracks['items']:
    tracks_arr.append(track['name'])
print(tracks_arr)
# top_tracks_df = get_tracks_df(top_tracks)
# top_tracks_df = get_track_audio_df(sp, top_tracks_df)
# top_tracks_df.to_pickle("spotify/top_tracks.pkl")


# print("Getting, transforming, and saving saved track data...")
# saved_tracks = offset_api_limit(sp, sp.current_user_saved_tracks())
# saved_tracks_df = get_tracks_df(saved_tracks)
# saved_tracks_df = get_track_audio_df(sp, saved_tracks_df)
# saved_tracks_df.to_pickle("spotify/saved_tracks.pkl")


# print("Getting, transforming, and saving playlist track data...")
# playlist_tracks_df = get_all_playlist_tracks_df(sp, sp.current_user_playlists())
# playlist_tracks_df = get_track_audio_df(sp, playlist_tracks_df)
# playlist_tracks_df.to_pickle("spotify/playlist_tracks.pkl")
