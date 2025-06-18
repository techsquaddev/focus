import {
  GraduationCap,
  Code,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Wrapper } from "@/components";
import { projects_ad } from "@/assets";

export default function Projects() {
  return (
    <Wrapper>
      <div className="min-h-screen space-y-8 py-8 px-4">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            IT Project Service
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Professional assistance for students struggling with IT projects. We
            help you succeed in your academic journey.
          </p>
        </div>

        {/* Promotional Image */}
        <div className="relative">
          <img
            src={projects_ad}
            alt="Students working on IT projects with laptops and code"
            className="w-full h-full object-cover rounded-3xl shadow-lg"
          />
        </div>

        {/* Services Section */}
        <div className="bg-white border-2 border-primary rounded-3xl shadow-lg">
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              What We Offer
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Code className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Programming Projects
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Web development, mobile apps, desktop applications, and more
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Expert Guidance
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Professional developers and academic experts to guide you
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Quality Assurance
                  </h3>
                  <p className="text-gray-600 text-sm">
                    High-quality deliverables that meet academic standards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white border-2 border-secondary rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            Why Choose Our Service?
          </h2>
          <div className="grid gap-4 md:gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold text-xl">✓</span>
              </div>
              <h3 className="font-semibold text-gray-900">
                Academic Excellence
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Projects designed to help you learn and achieve top grades
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold text-xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900">Timely Delivery</h3>
              <p className="text-gray-600 text-sm mt-1">
                Meet your deadlines with our efficient project completion
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold text-xl">💡</span>
              </div>
              <h3 className="font-semibold text-gray-900">Learning Support</h3>
              <p className="text-gray-600 text-sm mt-1">
                Understand your project with detailed explanations
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600">
            Contact us today to discuss your IT project requirements
          </p>
          <a href="https://techsquad.live" target="_blank">
            <button className="flex items-center px-6 py-3 w-fit text-xl font-semibold bg-primary shadow-lg text-white rounded-lg hover:bg-dark-blue transition-colors duration-300">
              Contact Us Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </a>
        </div>
      </div>
    </Wrapper>
  );
}
