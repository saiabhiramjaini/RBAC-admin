import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import man1 from "@/assets/man1.svg";
import man2 from "@/assets/man2.svg";
import { useNavigate } from "react-router-dom";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            {/* Animated Heading Section */}
            <AnimatedSection className="mb-12 text-center md:text-left md:mb-0">
              <h1 className="mb-4 text-6xl font-bold text-gray-800 md:text-8xl font-staatliches">
                RBAC ADMIN DASHBOARD
              </h1>
              <TypeAnimation
                sequence={["Admin", 1000, "Manager", 1000, "Supervisor", 1000]}
                wrapper="h2"
                speed={50}
                className="text-4xl text-blue-600 md:text-6xl font-zillaslab"
                repeat={Infinity}
              />
            </AnimatedSection>

            {/* Animated Image */}
            <AnimatedSection>
              <motion.img
                src={man1}
                alt="Admin illustration"
                className="object-contain w-64 md:w-96"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-20 text-white bg-black md:py-32">
        <div className="container px-4 mx-auto">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <AnimatedSection>
              <motion.img
                src={man2}
                alt="Admin magic illustration"
                className="w-full max-w-md mx-auto"
                whileHover={{ rotate: 5 }}
              />
            </AnimatedSection>
            <AnimatedSection className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-staatliches">
                ADMIN MAGIC!
              </h2>
              <p className="text-xl md:text-2xl font-zillaslab">
                The RBAC is a modern, user-friendly admin dashboard designed for
                efficient management of users, roles, and permissions. Tailored
                to meet the needs of administrators, this platform simplifies
                access control and enhances security, offering an intuitive
                interface for managing complex workflows.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 text-white bg-black md:py-32">
        <div className="container px-4 mx-auto">
          <AnimatedSection className="space-y-8 text-center">
            <h2 className="text-5xl md:text-7xl font-staatliches">
              READY, ADMIN?
            </h2>
            <p className="max-w-4xl mx-auto text-xl md:text-3xl font-zillaslab">
              Elevate your access management game with RBAC because managing
              roles and permissions shouldn't feel like a chore.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
              onClick={()=>{navigate("/")}}
              className="px-8 py-4 text-lg text-blue-600 transition-colors duration-300 bg-black border border-white hover:bg-blue-700 hover:text-white">
                Start managing!
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};