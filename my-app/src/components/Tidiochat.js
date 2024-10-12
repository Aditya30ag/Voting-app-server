import { useEffect } from 'react';

const TidioChat = () => {
  useEffect(() => {
    const loadTidioScript = () => {
      if (document.getElementById('tidio-script')) return;

      const script = document.createElement('script');
      script.src = '//code.tidio.co/pevyscxnhqid7r8qaj7zybnxm0h0lryp.js';
      script.async = true;
      script.id = 'tidio-script';
      document.body.appendChild(script);
    };

    loadTidioScript();

    return () => {
      const tidioScript = document.getElementById('tidio-script');
      if (tidioScript) {
        tidioScript.remove();
      }
    };
  }, []);

  return null;
};
export default TidioChat;