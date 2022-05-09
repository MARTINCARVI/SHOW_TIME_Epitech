<template>
  <span>{{ user.username }}</span>
  <span>{{ user.email }}</span>
</template>
<script>
export default {
  name: "UserCard",
  components: {},
  props: { user: Object },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    console.log(this.user);
  },
  methods: {},
};
</script>
