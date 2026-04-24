export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: string;
  reps?: string;
  category: 'Stability' | 'Proprioception' | 'Isometric' | 'Recovery';
  image: string;
  instructions: string[];
  edsNote?: string;
}

export const EXERCISES: Exercise[] = [
  {
    id: '1',
    name: 'Isometric Neck Holds',
    description: 'Strengthens deep neck flexors to support cervical stability without over-extending.',
    duration: '3 mins',
    reps: '10 holds',
    category: 'Isometric',
    image: 'https://picsum.photos/seed/neck-eds/400/300',
    instructions: [
      'Place your palm against your forehead.',
      'Gently push your head into your hand without moving your head.',
      'Maintain a neutral spine; do not let your chin poke forward.',
      'Hold for 5-10 seconds, then relax.'
    ],
    edsNote: 'Focus on activation rather than force. Avoid any clicking or sharp pain.'
  },
  {
    id: '2',
    name: 'Wall Scapular Slides',
    description: 'Improves shoulder blade stability and proprioception for hypermobile shoulders.',
    duration: '4 mins',
    reps: '12 reps',
    category: 'Stability',
    image: 'https://picsum.photos/seed/shoulder-eds/400/300',
    instructions: [
      'Stand with your back against a wall, feet slightly forward.',
      'Keep elbows and wrists in contact with the wall if possible.',
      'Slowly slide arms up and down in a "W" to "Y" motion.',
      'Keep your core engaged to prevent your lower back from arching.'
    ],
    edsNote: 'Stop just before your elbows lose contact with the wall. Do not "lock" your shoulders at the top.'
  },
  {
    id: '3',
    name: 'Proprioceptive Foot Grounding',
    description: 'Enhances balance and awareness of joint position in the lower limbs.',
    duration: '5 mins',
    category: 'Proprioception',
    image: 'https://picsum.photos/seed/balance-eds/400/300',
    instructions: [
      'Stand barefoot on a firm surface.',
      'Imagine your foot has three points of contact: big toe, pinky toe, and heel.',
      'Gently "root" these points into the ground.',
      'Shift your weight slightly forward and back without locking your knees.'
    ],
    edsNote: 'Keep a "micro-bend" in your knees at all times to avoid hyperextension.'
  },
  {
    id: '4',
    name: 'Isometric Glute Squeezes',
    description: 'Builds pelvic stability to protect the SI joint and hips.',
    duration: '3 mins',
    reps: '15 reps',
    category: 'Isometric',
    image: 'https://picsum.photos/seed/hip-eds/400/300',
    instructions: [
      'Lie on your back with knees bent and feet flat.',
      'Squeeze your glutes together firmly.',
      'Hold for 5 seconds while keeping your pelvis neutral.',
      'Slowly release.'
    ],
    edsNote: 'Ensure you are not using your lower back to lift. This is a squeeze, not a bridge.'
  }
];
