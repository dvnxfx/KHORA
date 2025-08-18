// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQDM-9MMfQv3WxbJN9UA872BB4GIvWU7T0PbbaHdq30lrZKsWE7mDUPWoEaMlLkhjtievMDaOhM0bUBu_74CoJmIHJKU0xLR5pGownVUSjTxxaVdMLN3WIyeR2YIkpByIYqLDrsbqMKQhkMKb6LaG141VrMCM2h58iFE-pg7w5Fl21KUuEdKVcCAECd5l4vZuxYaOH4PF5YpW7SK33AJkW5eWqKOUT_kdxtsV3qQNXJNK9Z0bv4e0ujXTWRxbwVoCYQ9nt9ImKnnOFGAewmwO5s0h-SzG5lgtdtUmwb5owP52h40VIH54WAq-11mSeOd3hoS';
async function fetchWebApi(endpoint, method) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:0A8YhNLcSp4FzFfLVpapF9','spotify:track:6A4B8UPh7TWpnGFj0BR26d','spotify:track:1FBXdEPpYnaoNAljJPTeFQ','spotify:track:75n8NNxozHYy7THEzzpWtX','spotify:track:3c9kVsKF68xMzlS0NikVn3'
];

async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My top tracks playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);
