
        function updateTimeElapsed() {
            const startTime = new Date('Tue, 17 Dec 2024 16:36:54 GMT');
            const now = new Date();

            // Calculate the difference in milliseconds
            let diff = now - startTime;

            // Extract the components
            let years = now.getFullYear() - startTime.getFullYear();
            let months = now.getMonth() - startTime.getMonth();
            let days = now.getDate() - startTime.getDate();
            let hours = now.getHours() - startTime.getHours();
            let minutes = now.getMinutes() - startTime.getMinutes();
            let seconds = now.getSeconds() - startTime.getSeconds();

            // Adjust for negative values in months, days, hours, minutes, or seconds
            if (seconds < 0) {
                seconds += 60;
                minutes--;
            }
            if (minutes < 0) {
                minutes += 60;
                hours--;
            }
            if (hours < 0) {
                hours += 24;
                days--;
            }
            if (days < 0) {
                // Get the previous month's total days
                const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += previousMonth.getDate();
                months--;
            }
            if (months < 0) {
                months += 12;
                years--;
            }

            // Format the output
            const formattedTime = `${years.toString().padStart(2, '0')}:${months.toString().padStart(2, '0')}:${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // Display the elapsed time
            document.getElementById('timeElapsed').textContent = formattedTime;
        }

        // Update the elapsed time every second
        setInterval(updateTimeElapsed, 1000);
        window.onload = updateTimeElapsed; // Run once on page load
