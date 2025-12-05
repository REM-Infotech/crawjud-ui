<template>
  <div class="header">
    <div class="navbar">
      <ul class="nav-items">
        <li class="nav-item">
          <NuxtLink :to="{ name: 'dashboard' }">
            <span> Dashboard </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
.header {
  height: 45px;
  width: 100%;
}

.navbar {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 15.5px 15.5px;
}
.nav-items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 15px;
  justify-content: center;
}
@media (prefers-color-scheme: dark) {
  .navbar {
    background-color: var(--p-maroon-950) !important;
    box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
  }
  .nav-items li {
    color: #ffffff;
  }
}
</style>
