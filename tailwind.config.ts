import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1440px'
			}
		},
		extend: {
			fontFamily: {
				satoshi: ['Satoshi', 'sans-serif'],
				inter: ['Inter Variable', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
				// Arabic font support
				arabic: ['Noto Sans Arabic', 'Tajawal', 'Arial', 'sans-serif'],
			},
			colors: {
				// Premium Thuraya Brand Colors - Enhanced for Readability
				'thuraya': {
					navy: '#1a365d',      // Deep navy - primary brand
					gold: '#FFD700',      // Enhanced Thuraya gold - better contrast
					'gold-light': '#FFED4E', // Lighter gold for better readability
					purple: '#8A2BE2',    // Accent purple - innovation
					'purple-light': '#9A4AFF', // Lighter purple for better contrast
					constellation: '#00BFFF', // Constellation blue - technology
					'constellation-light': '#33CFFF', // Lighter blue for readability
					sand: '#F4E4BC',      // Middle Eastern sand - warm neutral
					midnight: '#0F1419',  // Premium dark
					pearl: '#F8F9FA',     // Light neutral
					'pearl-bright': '#FFFFFF', // Pure white for high contrast
					'pearl-readable': '#E8EAF0', // Slightly tinted for better readability
				},
				// Enhanced readability colors
				readable: {
					primary: 'hsl(var(--text-primary))',
					secondary: 'hsl(var(--text-secondary))', 
					muted: 'hsl(var(--text-muted))',
					accent: 'hsl(var(--text-accent))',
				},
				// Cultural colors
				cultural: {
					copper: '#B87333',
					turquoise: '#40E0D0',
					saffron: '#F4C430',
					marble: '#F5F5DC',
				},
				// Legacy colors
				midnight: 'hsl(var(--midnight))',
				golden: 'hsl(var(--golden))',
				frost: 'hsl(var(--frost))',
				aurora: {
					start: 'hsl(var(--aurora-start))',
					end: 'hsl(var(--aurora-end))',
				},
				mystic: 'hsl(var(--mystic-purple))',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			backgroundImage: {
				'gradient-aurora': 'var(--gradient-aurora)',
				'gradient-midnight': 'var(--gradient-midnight)',
				'gradient-golden': 'var(--gradient-golden)',
				'gradient-connectivity': 'var(--gradient-connectivity)',
				// Premium Thuraya gradients
				'gradient-thuraya': 'linear-gradient(135deg, #1a365d 0%, #8A2BE2 50%, #00BFFF 100%)',
				'gradient-cultural': 'linear-gradient(45deg, #B87333 0%, #40E0D0 50%, #F4C430 100%)',
				'gradient-premium': 'linear-gradient(135deg, #0F1419 0%, #1a365d 100%)',
				'constellation-map': 'radial-gradient(circle at 30% 70%, #00BFFF 0%, transparent 50%), radial-gradient(circle at 70% 20%, #FFD700 0%, transparent 50%), radial-gradient(circle at 50% 50%, #8A2BE2 0%, transparent 50%)',
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'mystical': 'var(--shadow-mystical)',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'particle': {
					'0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.8' },
					'33%': { transform: 'translate(30px, -30px) scale(1.1)', opacity: '1' },
					'66%': { transform: 'translate(-20px, 20px) scale(0.9)', opacity: '0.8' },
					'100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.8' }
				},
				'bounce-subtle': {
					'0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
					'40%': { transform: 'translateY(-4px)' },
					'60%': { transform: 'translateY(-2px)' }
				},
				// Premium Thuraya animations
				'constellation': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-10px) rotate(120deg)' },
					'66%': { transform: 'translateY(5px) rotate(240deg)' },
				},
				'cultural-pulse': {
					'0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
					'50%': { opacity: '1', transform: 'scale(1.05)' },
				},
				'premium-glow': {
					'0%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
					'100%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)' },
				},
				'rotate-compass': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' },
				},
				'text-reveal': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0%)', opacity: '1' },
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'slide-up': 'slide-up 0.5s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'particle': 'particle 10s ease-in-out infinite',
				'bounce-subtle': 'bounce-subtle 2s infinite',
				// Premium Thuraya animations
				'constellation': 'constellation 20s ease-in-out infinite',
				'cultural-pulse': 'cultural-pulse 4s ease-in-out infinite',
				'premium-glow': 'premium-glow 3s ease-in-out infinite alternate',
				'rotate-compass': 'rotate-compass 60s linear infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'text-reveal': 'text-reveal 0.8s ease-out',
				'scale-in': 'scale-in 0.6s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
