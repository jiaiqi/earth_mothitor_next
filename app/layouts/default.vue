<template>
  <main>
    <PageHeader />
    <PageNav />
    <slot />
    <Footer />
    <ClientOnly>
      <FloatButtons />
    </ClientOnly>
  </main>
</template>
