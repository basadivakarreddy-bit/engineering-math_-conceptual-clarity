
import { MathConcept, ProofStep, QuizQuestion, LearningTopic } from './types';

export const LEARNING_TOPICS: LearningTopic[] = [
  {
    id: 'alg-1',
    title: 'Algebra Foundations',
    description: 'The logic of engineering systems. Mastering variables, complex planes, and logarithmic scaling.',
    keyPoints: [
      'Logarithmic scales in dB Signal Processing',
      'Polynomial stability in Control Systems',
      'Complex Phasors in Electrical AC analysis'
    ],
    formulas: [
      {
        id: 'alg-f1',
        name: 'Damped Oscillation',
        interactiveFormula: 'f(t) = A * e^{at} * sin(wt)',
        formulaBreakdown: [
          { component: 'A', meaning: 'Peak amplitude of the initial oscillation.' },
          { component: 'e^{at}', meaning: 'The damping envelope. Negative "a" causes decay.' },
          { component: 'sin(wt)', meaning: 'Periodic component representing system frequency.' }
        ],
        variables: [
          { name: 'A', label: 'Amplitude', default: 10, min: 0, max: 50, step: 1 },
          { name: 'a', label: 'Decay factor', default: -0.2, min: -1, max: 0, step: 0.05 },
          { name: 'w', label: 'Frequency', default: 5, min: 1, max: 20, step: 0.5 },
          { name: 't', label: 'Time', default: 2, min: 0, max: 10, step: 0.1 }
        ],
        calculate: (v) => `Output = ${(v.A * Math.exp(v.a * v.t) * Math.sin(v.w * v.t)).toFixed(3)}`
      },
      {
        id: 'alg-f2',
        name: 'Decibel Gain',
        interactiveFormula: 'G(dB) = 20 * log10(Vout / Vin)',
        formulaBreakdown: [
          { component: '20', meaning: 'The voltage-specific multiplier for logarithmic scaling.' },
          { component: 'log10', meaning: 'Base-10 log to handle wide ranges of signal magnitudes.' },
          { component: 'Vout / Vin', meaning: 'Voltage gain ratio of the system.' }
        ],
        variables: [
          { name: 'vo', label: 'V_out (V)', default: 10, min: 1, max: 100, step: 1 },
          { name: 'vi', label: 'V_in (V)', default: 1, min: 0.1, max: 10, step: 0.1 }
        ],
        calculate: (v) => `Gain = ${(20 * Math.log10(v.vo / v.vi)).toFixed(2)} dB`
      },
      {
        id: 'alg-f3',
        name: 'Quadratic Stress',
        interactiveFormula: 'S = (F/A) + (M*c/I)',
        formulaBreakdown: [
          { component: 'F/A', meaning: 'Axial stress component (Force over Area).' },
          { component: 'M*c/I', meaning: 'Bending stress component using Moment and Inertia.' }
        ],
        variables: [
          { name: 'f', label: 'Force (N)', default: 1000, min: 100, max: 5000, step: 100 },
          { name: 'a', label: 'Area (m²)', default: 0.1, min: 0.01, max: 1, step: 0.01 },
          { name: 'm', label: 'Moment (Nm)', default: 500, min: 0, max: 2000, step: 50 }
        ],
        calculate: (v) => `Stress = ${(v.f / v.a + v.m * 0.05 / 0.001).toFixed(0)} Pa`
      },
      {
        id: 'alg-f4',
        name: 'Complex Impedance',
        interactiveFormula: 'Z = R + j(wL - 1/wC)',
        formulaBreakdown: [
          { component: 'R', meaning: 'Real resistance component.' },
          { component: 'wL', meaning: 'Inductive reactance (imaginary).' },
          { component: '1/wC', meaning: 'Capacitive reactance (imaginary).' }
        ],
        variables: [
          { name: 'r', label: 'R (Ohms)', default: 50, min: 1, max: 500, step: 5 },
          { name: 'w', label: 'Freq (rad/s)', default: 377, min: 10, max: 1000, step: 10 },
          { name: 'l', label: 'L (H)', default: 0.1, min: 0.01, max: 1, step: 0.01 }
        ],
        calculate: (v) => `|Z| = ${Math.sqrt(v.r**2 + (v.w*v.l)**2).toFixed(2)} Ω`
      },
      {
        id: 'alg-f5',
        name: 'Shannon Entropy',
        interactiveFormula: 'H = -sum(pi * log2(pi))',
        formulaBreakdown: [
          { component: 'pi', meaning: 'Probability of a specific signal state occurring.' },
          { component: 'log2', meaning: 'Bits required to represent information.' }
        ],
        variables: [
          { name: 'p', label: 'Prob (p)', default: 0.5, min: 0.01, max: 0.99, step: 0.01 }
        ],
        calculate: (v) => {
          const h = -(v.p * Math.log2(v.p) + (1-v.p) * Math.log2(1-v.p));
          return `Entropy = ${h.toFixed(3)} bits`;
        }
      }
    ]
  },
  {
    id: 'calc-1',
    title: 'Calculus Essentials',
    description: 'Modeling dynamic rates and accumulation. The core of motion and energy transfer.',
    keyPoints: [
      'Instantaneous rates in kinematics',
      'Integration for area, volume, and work',
      'Optimization of structural efficiency'
    ],
    formulas: [
      {
        id: 'calc-f1',
        name: 'Work Done',
        interactiveFormula: 'W = Integral(F(x) dx)',
        formulaBreakdown: [
          { component: 'F(x)', meaning: 'Force as a function of position.' },
          { component: 'dx', meaning: 'Differential displacement element.' },
          { component: 'Integral', meaning: 'Summation of infinitesimal work units over a path.' }
        ],
        variables: [
          { name: 'f', label: 'Force Constant', default: 20, min: 0, max: 100, step: 5 },
          { name: 'd', label: 'Distance', default: 5, min: 0, max: 50, step: 1 }
        ],
        calculate: (v) => `Work = ${(v.f * v.d).toFixed(2)} J`
      },
      {
        id: 'calc-f2',
        name: 'Heat Conduction',
        interactiveFormula: 'q = -k * (dT / dx)',
        formulaBreakdown: [
          { component: '-k', meaning: 'Thermal conductivity (Fourier\'s Law constant).' },
          { component: 'dT/dx', meaning: 'Temperature gradient across the material.' }
        ],
        variables: [
          { name: 'k', label: 'k (W/mK)', default: 200, min: 1, max: 500, step: 10 },
          { name: 'dt', label: 'dT (Temp diff)', default: 50, min: 1, max: 200, step: 5 },
          { name: 'dx', label: 'dx (Thickness)', default: 0.05, min: 0.01, max: 0.5, step: 0.01 }
        ],
        calculate: (v) => `Flux = ${(v.k * v.dt / v.dx).toFixed(0)} W/m²`
      },
      {
        id: 'calc-f3',
        name: 'Capacitor Charge',
        interactiveFormula: 'i(t) = C * (dv / dt)',
        formulaBreakdown: [
          { component: 'C', meaning: 'Capacitance in Farads.' },
          { component: 'dv/dt', meaning: 'Rate of voltage change over time.' }
        ],
        variables: [
          { name: 'c', label: 'C (uF)', default: 100, min: 1, max: 1000, step: 10 },
          { name: 'dv', label: 'dV/dt (V/s)', default: 10, min: 1, max: 100, step: 1 }
        ],
        calculate: (v) => `Current = ${(v.c * 1e-6 * v.dv).toFixed(6)} A`
      },
      {
        id: 'calc-f4',
        name: 'Beam Deflection',
        interactiveFormula: 'y = (P*L^3) / (3*E*I)',
        formulaBreakdown: [
          { component: 'P*L^3', meaning: 'Load and length relationship (cubic sensitivity).' },
          { component: 'E*I', meaning: 'Flexural rigidity of the material/geometry.' }
        ],
        variables: [
          { name: 'p', label: 'Load (N)', default: 500, min: 10, max: 2000, step: 50 },
          { name: 'l', label: 'Length (m)', default: 2, min: 0.5, max: 10, step: 0.5 }
        ],
        calculate: (v) => `Deflection = ${(v.p * v.l**3 / (3 * 200e9 * 1e-6)).toFixed(4)} m`
      },
      {
        id: 'calc-f5',
        name: 'Fluid Drag',
        interactiveFormula: 'Fd = 0.5 * rho * v^2 * Cd * A',
        formulaBreakdown: [
          { component: 'rho', meaning: 'Fluid density (kg/m³).' },
          { component: 'v^2', meaning: 'Velocity squared (dominant factor at high speed).' },
          { component: 'Cd', meaning: 'Drag coefficient (shape factor).' }
        ],
        variables: [
          { name: 'v', label: 'Vel (m/s)', default: 30, min: 0, max: 100, step: 5 },
          { name: 'a', label: 'Area (m²)', default: 2, min: 0.1, max: 10, step: 0.1 }
        ],
        calculate: (v) => `Drag = ${(0.5 * 1.225 * v.v**2 * 0.3 * v.a).toFixed(2)} N`
      }
    ]
  },
  {
    id: 'vec-1',
    title: 'Vector Mechanics',
    description: 'Spatial reasoning for force, flow, and torque in 3D engineering environments.',
    keyPoints: [
      'Statics and Equilibrium in structures',
      'Fluid flux through control volumes',
      'Electromagnetic field interactions'
    ],
    formulas: [
      {
        id: 'vec-f1',
        name: 'Torque Magnitude',
        interactiveFormula: 'tau = |r| * |F| * sin(theta)',
        formulaBreakdown: [
          { component: '|r|', meaning: 'Lever arm displacement magnitude.' },
          { component: '|F|', meaning: 'Applied force magnitude.' },
          { component: 'sin(theta)', meaning: 'Orthogonality factor (perpendicularity).' }
        ],
        variables: [
          { name: 'r', label: 'Radius (m)', default: 0.5, min: 0.1, max: 5, step: 0.1 },
          { name: 'f', label: 'Force (N)', default: 100, min: 0, max: 1000, step: 10 },
          { name: 't', label: 'Angle (deg)', default: 90, min: 0, max: 180, step: 5 }
        ],
        calculate: (v) => `Torque = ${(v.r * v.f * Math.sin(v.t * Math.PI / 180)).toFixed(2)} Nm`
      },
      {
        id: 'vec-f2',
        name: 'Magnetic Force',
        interactiveFormula: 'Fm = q * (v x B)',
        formulaBreakdown: [
          { component: 'q', meaning: 'Particle charge.' },
          { component: 'v x B', meaning: 'Cross product of velocity and magnetic field.' }
        ],
        variables: [
          { name: 'q', label: 'Charge (C)', default: 1e-6, min: 1e-9, max: 1e-3, step: 1e-7 },
          { name: 'v', label: 'Vel (m/s)', default: 1000, min: 1, max: 10000, step: 100 },
          { name: 'b', label: 'Field (T)', default: 0.5, min: 0, max: 5, step: 0.1 }
        ],
        calculate: (v) => `Force = ${(v.q * v.v * v.b).toExponential(3)} N`
      },
      {
        id: 'vec-f3',
        name: 'Fluid Flux',
        interactiveFormula: 'Phi = v . A',
        formulaBreakdown: [
          { component: 'v', meaning: 'Velocity vector of the fluid.' },
          { component: 'A', meaning: 'Area normal vector.' },
          { component: '.', meaning: 'Dot product (effective through-flow).' }
        ],
        variables: [
          { name: 'v', label: 'Velocity', default: 10, min: 0, max: 100, step: 1 },
          { name: 'a', label: 'Area', default: 5, min: 1, max: 50, step: 1 }
        ],
        calculate: (v) => `Flux = ${(v.v * v.a).toFixed(1)} m³/s`
      },
      {
        id: 'vec-f4',
        name: 'Centripetal Force',
        interactiveFormula: 'Fc = m * v^2 / r',
        formulaBreakdown: [
          { component: 'm', meaning: 'Mass of the rotating object.' },
          { component: 'v^2 / r', meaning: 'Centripetal acceleration.' }
        ],
        variables: [
          { name: 'm', label: 'Mass (kg)', default: 2, min: 0.1, max: 100, step: 1 },
          { name: 'v', label: 'Vel (m/s)', default: 10, min: 0, max: 50, step: 1 },
          { name: 'r', label: 'Rad (m)', default: 1, min: 0.1, max: 10, step: 0.1 }
        ],
        calculate: (v) => `Force = ${(v.m * v.v**2 / v.r).toFixed(2)} N`
      },
      {
        id: 'vec-f5',
        name: 'Work (Vector)',
        interactiveFormula: 'W = F . d * cos(theta)',
        formulaBreakdown: [
          { component: 'F . d', meaning: 'Interaction of force and displacement vectors.' },
          { component: 'cos(theta)', meaning: 'Alignment factor between vectors.' }
        ],
        variables: [
          { name: 'f', label: 'Force (N)', default: 50, min: 0, max: 200, step: 5 },
          { name: 'd', label: 'Dist (m)', default: 10, min: 0, max: 50, step: 1 },
          { name: 't', label: 'Angle (deg)', default: 30, min: 0, max: 90, step: 5 }
        ],
        calculate: (v) => `Work = ${(v.f * v.d * Math.cos(v.t * Math.PI / 180)).toFixed(2)} J`
      }
    ]
  },
  {
    id: 'int-1',
    title: 'Integration Mastery',
    description: 'The science of accumulation. Moving from rates of change to total energy, volume, and mass distribution.',
    keyPoints: [
      'Energy accumulation in mechanical systems',
      'Centroids and Centers of Mass in aerospace',
      'Surface areas and volumes in civil engineering'
    ],
    formulas: [
      {
        id: 'int-f1',
        name: 'Definite Integral',
        interactiveFormula: 'A = Integral(k * x^n dx) from 0 to b',
        formulaBreakdown: [
          { component: 'k', meaning: 'Constant coefficient or scaling factor.' },
          { component: 'x^n', meaning: 'Power rule component for accumulation.' },
          { component: 'Integral', meaning: 'Total sum of infinitely many infinitesimal parts over the interval [0, b].' }
        ],
        variables: [
          { name: 'k', label: 'Scale (k)', default: 1, min: 0.1, max: 10, step: 0.1 },
          { name: 'n', label: 'Power (n)', default: 2, min: 0, max: 5, step: 1 },
          { name: 'b', label: 'Limit (b)', default: 5, min: 1, max: 20, step: 1 }
        ],
        calculate: (v) => `Area = ${(v.k * Math.pow(v.b, v.n + 1) / (v.n + 1)).toFixed(2)} units²`
      }
    ]
  },
  {
    id: 'mat-1',
    title: 'Matrix Algebra',
    description: 'Linear systems and multidimensional transformations. The backbone of robotic kinematics and structural nodal analysis.',
    keyPoints: [
      'Coordinate transformations in computer graphics',
      'Solving massive nodal systems in FEA',
      'Mode shapes in dynamic vibrations'
    ],
    formulas: [
      {
        id: 'mat-f1',
        name: '2x2 Determinant',
        interactiveFormula: 'det(A) = ad - bc',
        formulaBreakdown: [
          { component: 'ad', meaning: 'Product of the main diagonal elements.' },
          { component: 'bc', meaning: 'Product of the anti-diagonal elements.' },
          { component: 'det(A)', meaning: 'Scaling factor of the transformation; non-zero implies invertibility.' }
        ],
        variables: [
          { name: 'a', label: 'A[0,0]', default: 2, min: -10, max: 10, step: 1 },
          { name: 'b', label: 'A[0,1]', default: 1, min: -10, max: 10, step: 1 },
          { name: 'c', label: 'A[1,0]', default: 1, min: -10, max: 10, step: 1 },
          { name: 'd', label: 'A[1,1]', default: 2, min: -10, max: 10, step: 1 }
        ],
        calculate: (v) => `det(A) = ${(v.a * v.d - v.b * v.c).toFixed(1)}`
      }
    ]
  }
];

export const CONCEPTS: MathConcept[] = [
  {
    id: '1',
    title: 'Vector Calculus',
    category: 'Calculus',
    description: 'The study of differentiation and integration of vector fields.',
    application: 'Fluid dynamics in aerospace engineering and electromagnetic field theory.',
    image: 'https://picsum.photos/seed/vector/800/600'
  }
];

export const PROOFS: Record<string, ProofStep[]> = {
  'Vector Divergence Theorem': [
    {
      title: 'Introduction',
      content: 'Relates flux through a surface to divergence in the volume.',
      formula: '∬_S F · dS = ∭_V (∇ · F) dV'
    }
  ]
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- ALGEBRA ---
  { id: 'a1', category: 'Algebra', question: 'What is log(xy) equivalent to?', options: ['log(x) * log(y)', 'log(x) + log(y)', 'log(x) - log(y)', 'log(x^y)'], correctAnswer: 1, explanation: 'Logarithm of a product is the sum of logarithms.' },
  { id: 'a2', category: 'Algebra', question: 'In the complex plane, what is the value of i^2?', options: ['1', '0', '-1', 'Infinity'], correctAnswer: 2, explanation: 'By definition, the imaginary unit i is the square root of -1.' },
  { id: 'a3', category: 'Algebra', question: 'If the discriminant of a quadratic is greater than zero, how many real roots exist?', options: ['Zero', 'One', 'Two', 'Infinite'], correctAnswer: 2, explanation: 'A positive discriminant indicates two distinct real solutions.' },
  { id: 'a4', category: 'Algebra', question: 'What is log_b(1) for any base b?', options: ['1', '0', 'b', '-1'], correctAnswer: 1, explanation: 'Any base raised to the power of 0 equals 1.' },
  { id: 'a5', category: 'Algebra', question: 'Partial fraction decomposition is primarily used for:', options: ['Simplifying logs', 'Integrating rational functions', 'Finding matrix inverses', 'Solving linear equations'], correctAnswer: 1, explanation: 'It breaks complex fractions into simpler components for easier integration.' },
  { id: 'a6', category: 'Algebra', question: 'In a damped oscillation f(t) = A*e^{at}*sin(wt), what happens as a becomes more negative?', options: ['Oscillations grow', 'Oscillations decay faster', 'Frequency increases', 'Amplitude increases'], correctAnswer: 1, explanation: 'The negative exponent controls the rate of exponential decay.' },

  // --- CALCULUS ---
  { id: 'c1', category: 'Calculus', question: 'What does the gradient of a scalar field represent?', options: ['Average value', 'Direction of steepest increase', 'Volume', 'Rate of change along x'], correctAnswer: 1, explanation: 'Gradient points toward the steepest ascent.' },
  { id: 'c2', category: 'Calculus', question: 'The derivative of sin(x^2) is:', options: ['2x cos(x^2)', 'cos(x^2)', '2 sin(x)', 'x^2 cos(x)'], correctAnswer: 0, explanation: 'Calculated using the chain rule: d/dx[sin(u)] = cos(u) * du/dx.' },
  { id: 'c3', category: 'Calculus', question: 'What is the limit of (sin x) / x as x approaches 0?', options: ['0', '1', 'Infinity', 'Undefined'], correctAnswer: 1, explanation: 'This is a fundamental limit often used in optics and signal analysis.' },
  { id: 'c4', category: 'Calculus', question: 'A point where the second derivative changes sign is called a:', options: ['Critical point', 'Maximum', 'Minimum', 'Inflection point'], correctAnswer: 3, explanation: 'Inflection points mark changes in the concavity of a curve.' },
  { id: 'c5', category: 'Calculus', question: "L'Hopital's Rule is applicable when a limit results in:", options: ['0/0 or inf/inf', '0/1', '1/inf', 'inf/0'], correctAnswer: 0, explanation: 'It is specifically for indeterminate forms.' },
  { id: 'c6', category: 'Calculus', question: 'Which rule is used to differentiate a product of two functions?', options: ['Quotient Rule', 'Chain Rule', 'Product Rule', 'Power Rule'], correctAnswer: 2, explanation: 'd(uv) = u dv + v du.' },

  // --- VECTORS ---
  { id: 'v1', category: 'Vectors', question: 'What is the dot product of two perpendicular vectors?', options: ['1', 'Infinity', '0', '-1'], correctAnswer: 2, explanation: 'A · B = |A||B|cos(90) = 0.' },
  { id: 'v2', category: 'Vectors', question: 'The cross product A x B results in a vector that is:', options: ['Parallel to A', 'Parallel to B', 'Perpendicular to both A and B', 'Zero always'], correctAnswer: 2, explanation: 'Cross product creates an orthogonal vector.' },
  { id: 'v3', category: 'Vectors', question: 'What is the magnitude of a unit vector?', options: ['0', '1', 'Infinity', 'Varies'], correctAnswer: 1, explanation: 'A unit vector has a length of exactly one.' },
  { id: 'v4', category: 'Vectors', question: 'The dot product A · A is equal to:', options: ['0', '1', 'Magnitude squared', 'A'], correctAnswer: 2, explanation: 'A · A = |A|^2 cos(0) = |A|^2.' },
  { id: 'v5', category: 'Vectors', question: 'The cross product of a vector with itself (A x A) is:', options: ['1', '0', 'A^2', '-1'], correctAnswer: 1, explanation: 'The sine of 0 degrees is 0.' },
  { id: 'v6', category: 'Vectors', question: 'The Right-Hand Rule determines:', options: ['Dot product sign', 'Cross product direction', 'Vector magnitude', 'Unit vector base'], correctAnswer: 1, explanation: 'It defines the orientation of the resulting vector in a cross product.' },

  // --- INTEGRATION ---
  { id: 'i1', category: 'Integration', question: 'The definite integral represents:', options: ['The slope of a line', 'The area under a curve', 'The rate of change', 'Matrix dimensions'], correctAnswer: 1, explanation: 'Integration is the process of summing up infinitesimal parts.' },
  { id: 'i2', category: 'Integration', question: 'What is the integral of 1/x dx?', options: ['x^2/2', 'log|x| + C', 'e^x', '1'], correctAnswer: 1, explanation: 'The natural logarithm is the antiderivative of 1/x.' },
  { id: 'i3', category: 'Integration', question: 'The Fundamental Theorem of Calculus links:', options: ['Algebra and Geometry', 'Differentiation and Integration', 'Limits and Sums', 'Vectors and Matrices'], correctAnswer: 1, explanation: 'It shows that integration and differentiation are inverse processes.' },
  { id: 'i4', category: 'Integration', question: 'Integration by Parts is derived from the:', options: ['Chain Rule', 'Quotient Rule', 'Product Rule', 'Power Rule'], correctAnswer: 2, explanation: 'It is the integral form of the product rule.' },
  { id: 'i5', category: 'Integration', question: 'The Disk Method is used to calculate:', options: ['Surface Area', 'Arc Length', 'Volume of Revolution', 'Mass Density'], correctAnswer: 2, explanation: 'It sums up the volumes of circular slices.' },
  { id: 'i6', category: 'Integration', question: 'RMS (Root Mean Square) calculation involves:', options: ['Integration', 'Subtraction', 'Division only', 'Logs'], correctAnswer: 0, explanation: 'Vrms = sqrt(1/T * Integral of v^2 dt).' },

  // --- MATRICES ---
  { id: 'm1', category: 'Matrices', question: 'If det(A) = 0, the matrix is:', options: ['Identity', 'Non-singular', 'Singular', 'Diagonal'], correctAnswer: 2, explanation: 'A zero determinant means the matrix cannot be inverted.' },
  { id: 'm2', category: 'Matrices', question: 'The sum of the diagonal elements of a matrix is called the:', options: ['Determinant', 'Trace', 'Rank', 'Norm'], correctAnswer: 1, explanation: 'The Trace is an invariant property of linear transformations.' },
  { id: 'm3', category: 'Matrices', question: 'The transpose of a product (AB)^T is:', options: ['A^T B^T', 'B^T A^T', 'AB', 'BA'], correctAnswer: 1, explanation: 'Transposing swaps the order of matrix multiplication.' },
  { id: 'm4', category: 'Matrices', question: 'An Identity Matrix multiplied by Matrix A results in:', options: ['Matrix I', 'Zero Matrix', 'Matrix A', 'Transpose of A'], correctAnswer: 2, explanation: 'IA = A, similar to multiplying by 1.' },
  { id: 'm5', category: 'Matrices', question: 'The values lambda in Ax = lambda x are called:', options: ['Constants', 'Eigenvalues', 'Determinants', 'Scalars'], correctAnswer: 1, explanation: 'They represent scaling factors along eigenvectors.' },
  { id: 'm6', category: 'Matrices', question: 'A matrix A is orthogonal if A^T equals:', options: ['A', '-A', 'A inverse', 'Identity'], correctAnswer: 2, explanation: 'Orthogonal matrices preserve lengths and angles.' }
];
