# Instaglam

[Instaglam link][heroku]

[heroku] : http://instaglam.herokuapp.com

[instaglam]: http://www.instagram.com

## Minimum Viable Product

Instaglam is a web application built using Ruby on Rails and React.js.
Instaglam allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, view, and delete photos
- [ ] Users can follow other users to fill their news feed
- [ ] Users can comment and like photos
- [ ] Tag photos with multiple tags and search photos by tag

## Design Docs
* [DB schema][schema]

[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Photo Model and JSON API (3 days)

Phase 1: I will begin by implementing user signup and authentication. There will
be a basic landing page (News Feed Page) after signup that will contain the
container for the application's root React component. Before construction of the front end,
there needs to be a working rails back end as well as full JSON API for Photos.

[Details][phase-one]

### Phase 2: User Functionality and Profile Edit (2 days)
Phase 2 consists of giving users the ability to edit their profiles - forms to
fill out their current information, password, as well as their current profile picture.
They will be able to view the edit pages from their user page as well as the
navigation bar at the top.

[Details][phase-two]

### Phase 3: Flux Architecture and Photo CRUD (4.5 days)

Phase 3 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, a Photo store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once this is done, I will create React
views for the Photos - "News Feed", "Individual Photo", and "Add Photo".
On the user pages, users should be able to follow/unfollow.

[Details][phase-three]

### Phase 4: Tags, Follows, Likes and Comments (5 days)
Phase 4 consists of adding tags to photos and implementing views based on
searched tags. Photos can be tagged with multiple tags, and tags pages
views all photos that have the tag.
Users can follow and unfollow other Users' Pages.
Users can leave 'comments' on others' Photos, as well as 'likes'.


### Phase 5: Searching and Navigation Bar (3 days)
A vital part of Instaglam is the functionality to be able to search for users and
hashtags with the search bar. Searching for hashtags or users will bring the browser
to similar pages, the only difference being a follow button for users' pages.
The Navigation Bar will enclose the search bar, and also include buttons to home
and self user's profile page.

[Details][phase-five]


### Phase 6: Styling Cleanup (2 days)
I will use CSS to clean up the layouts of the pages.

[Details][phase-six]


### Bonus Features (TBD)
- [ ] Prettify transitions
- [ ] Pagination / infinite scroll for User/Hashtag Pages

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md

Flux

Views (React Components)

NotesIndex
NotesIndexItem
NoteForm


Stores
Note

Actions
ApiActions.receiveAllNotes
ApiActions.receiveSingleNote
ApiActions.deleteNote

ApiUtil
ApiUtil.fetchAllNotes
ApiUtil.fetchSingleNote
ApiUtil.createNote
ApiUtil.editNote
ApiUtil.destroyNote

Gems/Libraries
Flux Dispatcher
Twitter Bootstrap
