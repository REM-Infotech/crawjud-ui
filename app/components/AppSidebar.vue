<script setup lang="ts">
const { show } = storeToRefs(sidebarStore());

import MdiChartBoxOutline from "~icons/mdi/chart-box-outline?width=36px&height=26px";
import MdiRobotOutline from "~icons/mdi/robot-outline?width=36px&height=26px";
</script>

<template>
  <div class="container-fluid">
    <div
      class="offcanvas offcanvas-start"
      data-bs-scroll="true"
      tabindex="-1"
      id="offcanvas"
      aria-labelledby="offcanvasLabel"
    >
      <div class="offcanvas-header">
        <a
          href="/"
          class="d-flex align-items-center gap-2 mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <img src="/img/crawjud.png" alt="" width="45" />
          <span class="fs-4">CrawJUD</span>
        </a>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>
      <div class="offcanvas-body" style="height: 100dvh">
        <div
          class="d-flex flex-column flex-shrink-0 text-bg-dark"
          style="width: 365px; height: 100%"
        >
          <hr />
          <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
              <NuxtLink
                :to="{ name: 'dashboard' }"
                class="nav-link d-flex align-items-center gap-2"
                active-class="active text-white"
              >
                <MdiChartBoxOutline />
                <span class="fw-semibold">Dashboard</span>
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                :to="{ name: 'bots' }"
                class="nav-link d-flex align-items-center gap-2"
                active-class="active text-white"
              >
                <MdiRobotOutline />
                <span class="fw-semibold">Robôs</span>
              </NuxtLink>
            </li>
          </ul>
          <hr />
          <div class="dropdown">
            <a
              href="#"
              class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt=""
                width="32"
                height="32"
                class="rounded-circle me-2"
              />
              <strong>mdo</strong>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
              <!-- <li><a class="dropdown-item" href="#">New project...</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><a class="dropdown-item" href="#">Profile</a></li> -->
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a
                  data-bs-dismiss="offcanvas"
                  class="dropdown-item"
                  @click="async () => await auth.logout()"
                  href="#"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
