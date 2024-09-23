<template>
  <main>
    <PageHeader />
    <PageNav />
    <slot />
    <ClientOnly>
      <FloatButtons />
    </ClientOnly>
  </main>
</template>
