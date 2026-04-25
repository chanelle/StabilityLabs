# 🥽 VisionPT: EDS Edition

**Spatial Physical Therapy for Ehlers-Danlos Syndrome**

VisionPT is a high-fidelity spatial computing prototype designed for the Apple Vision Pro. It provides a specialized physical therapy experience for individuals with Ehlers-Danlos Syndrome (EDS), prioritizing joint stability, proprioception, and safety within a premium glassmorphic interface.

![VisionPT Mockup 1](https://becomingbeta.com/VisionOS/img/StabilityLab1.png)
*First screen asking for app permissions*

![VisionPT Mockup 2](https://becomingbeta.com/VisionOS/img/StabilityLab2.png)
*Stability Lab main screen - First version*

![VisionPT Mockup 3](https://becomingbeta.com/VisionOS/img/StabilityLab3.png)
*Stability Lab Insights - Keeping track of progress*

![VisionPT Mockup 4](https://becomingbeta.com/VisionOS/img/StabilityLab4.png)
*Stability Lab - EDS Consultant for custom care*

![VisionPT Mockup 5](https://becomingbeta.com/VisionOS/img/StabilityLab5.png)
*Stabilty Lab - Isometric Screen Internal View*

## ✨ Key Features

### 🧊 Spatial Computing Aesthetic
- **Deep Glassmorphism**: Multi-layered blur effects and subtle gradients optimized for visionOS.
- **Atmospheric Motion**: Fluid transitions and floating UI elements that respond to spatial depth.
- **Premium Typography**: Pairing **Cormorant Garamond** for editorial elegance with **Inter** for clinical clarity.

### 🧬 EDS-Specific Care
- **Stability Protocols**: Exercises focused on isometric holds and joint protection rather than traditional range-of-motion.
- **EDS Safety Notes**: Built-in clinical warnings to prevent hyperextension and subluxations.
- **AI EDS Specialist**: A custom-grounded AI coach capable of discussing flare-up management and stability refining.

### 📊 Progress Tracking
- **Stability Index**: Track your balance and joint control over time.
- **Pain Level Insights**: Monitor daily discomfort levels to identify trends and avoid overexertion.

---

## 🛠️ Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **AI**: Google Gemini API
- **Charts**: Recharts
- **Native Bridge**: Capacitor (visionOS/iOS target)

---

## 🚀 Native visionOS Setup (Xcode)

To test this on your Mac or Apple Vision Pro:

1. **Clone the Repo**
   ```bash
   git clone <your-repo-url>
   cd vision-pt
   ```

2. **Install & Build**
   ```bash
   npm install
   npm run build:cap
   ```

3. **Open in Xcode**
   ```bash
   npx cap add ios
   npx cap open ios
   ```

4. **Xcode Configuration**
   - Select the **App** target.
   - In **Supported Destinations**, add **Apple Vision**.
   - Build and run!

---

## 📸 Recommended Screenshots for your Portfolio
To showcase this app effectively, we recommend capturing these three views:
1. **The Stability Lab**: The main exercise library showing the grid of glassmorphic cards.
2. **Protocol Detail**: A view of an exercise (like Isometric Neck Holds) showing the EDS Safety Note and instructions.
3. **Joint Insights**: The progress dashboard showing the Area and Bar charts.

---

## 🔑 Environment Variables
This app requires a Gemini API key. Create a `.env` file in the root:
```env
GEMINI_API_KEY=your_key_here
```

---
*Created with ❤️ for the EDS community.*
