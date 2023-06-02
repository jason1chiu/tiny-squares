import React from 'react';
import Store from 'views/admin/store/components/Store'
import StoreHeader from 'views/admin/store/components/StoreHeader'

export default function Overview() {
  return (
    <>
      <StoreHeader />
      <Store />
    </>
  )
}