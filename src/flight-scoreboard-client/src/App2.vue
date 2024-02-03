<script setup>
import { RouterView } from 'vue-router'
</script>

<template>


  <v-app>
    <!--   <v-navigation-drawer v-model="sidebar" app>
          <v-list>
            <v-list-item-title
              v-for="item in menuItems"
              :key="item.title"
              :to="item.path">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>{{ item.title }}</v-list-tile-content>
            </v-list-item-title>
          </v-list>
        </v-navigation-drawer>-->

    <v-toolbar app>
       

     
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      </span>

      <v-toolbar-title>

        <!--        <a class="d-inline-block ms-4 me-2" href="/">
                  <div aria-label="Vuetify Logo" class="v-responsive v-img shrink" role="img" style="width: 148px;">
                    <div class="v-responsive__sizer" style="padding-bottom: 23.5772%;"></div>
                    <img alt="Vuetify Logo" class="v-img__img v-img__img&#45;&#45;contain"
                         src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg" style="">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;</div>
                </a>-->

        dfgdhfgh
        <!--        <router-link style="cursor: pointer" tag="span" to="/">
        &lt;!&ndash;          <v-img
                    :width="170"
                    aspect-ratio="16/9"
                    cover
                    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                  ></v-img>&ndash;&gt;
                  {{ appTitle }}
                </router-link>-->
      </v-toolbar-title>

      <!--      <v-spacer></v-spacer>-->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
          flat>
          <v-icon dark left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <RouterView />
    <!--  <v-content>
          <router-view></router-view>
        </v-content>-->

  </v-app>


  <!--  
   <v-card>
        <v-toolbar color="primary">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
    
          <v-toolbar-title>Page title</v-toolbar-title>
    
          <v-spacer></v-spacer>
    
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
    
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
    
          <template v-slot:extension>
            <v-tabs
              v-model="model"
              centered
            >
              <v-tab
                v-for="i in this.element.length"
                :key="i"
                :value="i"
              >
                {{ element[i] }}
              </v-tab>
                      </v-tabs>
          </template>
        </v-toolbar>
    
        <v-window v-model="model">
          <v-window-item
            v-for="i in this.element.length"
            :key="i"
            :value="i"
          >
            <v-card>
              <v-card-text>{{ text }}
                <RouterLink to="/city">City</RouterLink>
                <RouterView />
    
    
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-card>-->


  <!--  <v-card>
      <v-toolbar
        color="deep-purple-accent-4"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
        <v-toolbar-title>Page title</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
  
        <template v-slot:extension>
          <v-tabs
            v-model="currentItem"
            fixed-tabs
          >
            <v-tab
              v-for="item in items"
              :key="item"
              :value="'tab-' + item"
            >
              {{ item }}
            </v-tab>
  
  &lt;!&ndash;          <v-menu
              v-if="more.length"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  class="align-self-center me-4"
                  height="100%"
                  rounded="0"
                  v-bind="props"
                  variant="plain"
                >
                  more
                  <v-icon end>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
  
              <v-list class="bg-grey-lighten-3">
                <v-list-item
                  v-for="item in more"
                  :key="item"
                  @click="addItem(item)"
                >
                  {{ item }}
                </v-list-item>
              </v-list>
            </v-menu>&ndash;&gt;
          </v-tabs>
        </template>
      </v-toolbar>
  
        <RouterView />
  &lt;!&ndash;    <v-window v-model="currentItem">
        <v-window-item
          v-for="item in items.concat(more)"
          :key="item"
          :value="'tab-' + item"
        >
          <v-card flat>
            <v-card-text>
              <CityView/>
              
  &lt;!&ndash;           <RouterView /> &ndash;&gt;
  &lt;!&ndash;            <RouterLink to="/city">City</RouterLink>&ndash;&gt;
              
             <h2>{{ item }}</h2>
              {{ text }}
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>&ndash;&gt;
    </v-card>  
    
    
    
    
    -->


  <!--  <RouterLink to="/city">City</RouterLink>-->
  <!--  <RouterView />-->
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      appTitle: 'Flight Scoreboard',
      sidebar: false,
      menuItems: [
        { title: 'City', path: '/city', icon: 'home' }
        /* { title: 'Sign Up', path: '/signup', icon: 'face' },
         { title: 'Sign In', path: '/signin', icon: 'lock_open' }*/
      ]
    }
  }
}


/*export default {
  data() {
    return {
      model: 'tab-2',
      element: ['City', 'Pilot', 'Airline']
      /!*  text: 'Lorem ipsum .'*!/
    }
  }
}*/


/*export default {
  data: () => ({
    currentItem: 'tab-Web',
    items: [
      'Web', 'Shopping', 'Videos', 'Images'
    ],
    more: [
      'News', 'Maps', 'Books', 'Flights', 'Apps'
    ],
    text: 'Lorem ipsum dolor sit amet, .'
  }),

  methods: {
    addItem(item) {
      const removed = this.items.splice(0, 1)
      this.items.push(
        ...this.more.splice(this.more.indexOf(item), 1)
      )
      this.more.push(...removed)
      this.$nextTick(() => {
        this.currentItem = 'tab-' + item
      })
    }
  }
}*/

</script>


<style>

</style>

