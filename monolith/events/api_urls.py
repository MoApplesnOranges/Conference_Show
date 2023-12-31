from django.urls import path

from .api_views import (
    api_list_conferences,
    api_list_locations,
    api_show_conference,
    api_show_location,
    api_list_states,
    api_list_conference_location
)


urlpatterns = [
    path("location_id/", api_list_conference_location, name="api_list_conference_location"),
    path("states/", api_list_states, name="api_list_states"),
    path("conferences/", api_list_conferences, name="api_list_conferences"),
    path(
        "conferences/<int:pk>/",
        api_show_conference,
        name="api_show_conference",
    ),
    path("locations/", api_list_locations, name="api_list_locations"),
    path("locations/<int:pk>/", api_show_location, name="api_show_location"),
]
