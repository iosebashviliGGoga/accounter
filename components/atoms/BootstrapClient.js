"use client"

import { useEffect } from 'react';

function BootstrapClient() {
    useEffect(() => {
        // Dynamically import Bootstrap JavaScript
        import('bootstrap/dist/js/bootstrap.bundle.min.js')
          .then(() => {
            console.log('Bootstrap JS loaded');
          })
          .catch((error) => {
            console.error('Error loading Bootstrap JS:', error);
          });
      }, []);

  return null;
}

export default BootstrapClient;