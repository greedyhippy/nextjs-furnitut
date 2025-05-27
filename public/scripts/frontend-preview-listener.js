(function frontendPreviewHandler() {
    addEventListener('message', (event) => {
        if (!event.source) {
            return;
        }

        // Check for the type of event
        if (event.data?.crystallize?.reloadDueToStaleItem) {
            location.reload();

            // Notify parent that reloading is in the works
            event.source.postMessage(
                {
                    frontendPreview: { reloading: true },
                },
                { targetOrigin: event.origin },
            );
        }
    });

    // Let the parent know that it has loaded
    setTimeout(function () {
        parent.postMessage(
            {
                frontendPreview: { loaded: true },
            },
            { targetOrigin: '*' },
        );
    }, 100);
})();
