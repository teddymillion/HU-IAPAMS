
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiUpload, FiX, FiPlus, FiTrash2, FiLink } from 'react-icons/fi';
import { useState } from 'react';

export const ProfileEditModal = ({ 
  isOpen, 
  onClose, 
  profilePhoto, 
  userData, 
  onFileChange, 
  onSave 
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startYear: '',
    endYear: '',
    description: ''
  });
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 'beginner'
  });

  const handleAddEducation = () => {
    const updatedUser = {
      ...userData,
      education: [...(userData.education || []), newEducation]
    };
    onSave(updatedUser);
    setNewEducation({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      description: ''
    });
  };

  const handleAddExperience = () => {
    const updatedUser = {
      ...userData,
      experience: [...(userData.experience || []), newExperience]
    };
    onSave(updatedUser);
    setNewExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };

  const handleAddSkill = () => {
    const updatedUser = {
      ...userData,
      skills: [...(userData.skills || []), newSkill]
    };
    onSave(updatedUser);
    setNewSkill({
      name: '',
      level: 'beginner'
    });
  };

  const handleRemoveItem = (field, index) => {
    const updatedArray = [...userData[field]];
    updatedArray.splice(index, 1);
    onSave({ ...userData, [field]: updatedArray });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Edit Profile</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="flex border-b mb-6">
                <button
                  className={`py-2 px-4 font-medium ${activeTab === 'basic' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('basic')}
                >
                  Basic Info
                </button>
                <button
                  className={`py-2 px-4 font-medium ${activeTab === 'education' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('education')}
                >
                  Education
                </button>
                <button
                  className={`py-2 px-4 font-medium ${activeTab === 'experience' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('experience')}
                >
                  Experience
                </button>
                <button
                  className={`py-2 px-4 font-medium ${activeTab === 'skills' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('skills')}
                >
                  Skills
                </button>
                <button
                  className={`py-2 px-4 font-medium ${activeTab === 'social' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('social')}
                >
                  Social & Links
                </button>
              </div>

              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-2">
                      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2 overflow-hidden">
                        {profilePhoto ? (
                          <img 
                            src={profilePhoto} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FiUser size={32} />
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 bg-green-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-green-600">
                        <FiUpload size={18} />
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={onFileChange}
                        />
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">Click to upload photo</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={userData.fullName || ''}
                        onChange={(e) => onSave({...userData, fullName: e.target.value})}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <input
                        type="text"
                        value={userData.username || ''}
                        onChange={(e) => onSave({...userData, username: e.target.value})}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                        disabled
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={userData.email || ''}
                        onChange={(e) => onSave({...userData, email: e.target.value})}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={userData.phone || ''}
                        onChange={(e) => onSave({...userData, phone: e.target.value})}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        value={userData.department || ''}
                        onChange={(e) => onSave({...userData, department: e.target.value})}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        value={userData.positionType || ''}
                        onChange={(e) => onSave({...userData, positionType: e.target.value})}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={userData.bio || ''}
                      onChange={(e) => onSave({...userData, bio: e.target.value})}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      value={userData.address || ''}
                      onChange={(e) => onSave({...userData, address: e.target.value})}
                      rows={2}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              )}
              
              {activeTab === 'education' && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    {userData.education?.map((edu, index) => (
                      <div key={index} className="border rounded-lg p-4 relative">
                        <button 
                          onClick={() => handleRemoveItem('education', index)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 size={18} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                            <input
                              type="text"
                              value={edu.institution || ''}
                              onChange={(e) => {
                                const updatedEducation = [...userData.education];
                                updatedEducation[index].institution = e.target.value;
                                onSave({...userData, education: updatedEducation});
                              }}
                              className="w-full border border-gray-300 rounded-md p-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                            <input
                              type="text"
                              value={edu.degree || ''}
                              onChange={(e) => {
                                const updatedEducation = [...userData.education];
                                updatedEducation[index].degree = e.target.value;
                                onSave({...userData, education: updatedEducation});
                              }}
                              className="w-full border border-gray-300 rounded-md p-2"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                            <input
                              type="text"
                              value={edu.fieldOfStudy || ''}
                              onChange={(e) => {
                                const updatedEducation = [...userData.education];
                                updatedEducation[index].fieldOfStudy = e.target.value;
                                onSave({...userData, education: updatedEducation});
                              }}
                              className="w-full border border-gray-300 rounded-md p-2"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                              <input
                                type="number"
                                value={edu.startYear || ''}
                                onChange={(e) => {
                                  const updatedEducation = [...userData.education];
                                  updatedEducation[index].startYear = parseInt(e.target.value);
                                  onSave({...userData, education: updatedEducation});
                                }}
                                className="w-full border border-gray-300 rounded-md p-2"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                              <input
                                type="number"
                                value={edu.endYear || ''}
                                onChange={(e) => {
                                  const updatedEducation = [...userData.education];
                                  updatedEducation[index].endYear = parseInt(e.target.value);
                                  onSave({...userData, education: updatedEducation});
                                }}
                                className="w-full border border-gray-300 rounded-md p-2"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            value={edu.description || ''}
                            onChange={(e) => {
                              const updatedEducation = [...userData.education];
                              updatedEducation[index].description = e.target.value;
                              onSave({...userData, education: updatedEducation});
                            }}
                            rows={2}
                            className="w-full border border-gray-300 rounded-md p-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium mb-3">Add New Education</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                        <input
                          type="text"
                          value={newEducation.institution}
                          onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                        <input
                          type="text"
                          value={newEducation.degree}
                          onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                        <input
                          type="text"
                          value={newEducation.fieldOfStudy}
                          onChange={(e) => setNewEducation({...newEducation, fieldOfStudy: e.target.value})}
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                          <input
                            type="number"
                            value={newEducation.startYear}
                            onChange={(e) => setNewEducation({...newEducation, startYear: e.target.value})}
                            className="w-full border border-gray-300 rounded-md p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                          <input
                            type="number"
                            value={newEducation.endYear}
                            onChange={(e) => setNewEducation({...newEducation, endYear: e.target.value})}
                            className="w-full border border-gray-300 rounded-md p-2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={newEducation.description}
                        onChange={(e) => setNewEducation({...newEducation, description: e.target.value})}
                        rows={2}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <button
                      onClick={handleAddEducation}
                      className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FiPlus className="mr-2" /> Add Education
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'experience' && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    {userData.experience?.map((exp, index) => (
                      <div key={index} className="border rounded-lg p-4 relative">
                        <button 
                          onClick={() => handleRemoveItem('experience', index)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 size={18} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <input
                              type="text"
                              value={exp.company || ''}
                              onChange={(e) => {
                                const updatedExperience = [...userData.experience];
                                updatedExperience[index].company = e.target.value;
                                onSave({...userData, experience: updatedExperience});
                              }}
                              className="w-full border border-gray-300 rounded-md p-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                            <input
                              type="text"
                              value={exp.position || ''}
                              onChange={(e) => {
                                const updatedExperience = [...userData.experience];
                                updatedExperience[index].position = e.target.value;
                                onSave({...userData, experience: updatedExperience});
                              }}
                              className="w-full border border-gray-300 rounded-md p-2"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                              type="date"
                              value={exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : ''}
                              onChange={(e) => {
                                const updatedExperience = [...userData.experience];
                                updatedExperience[index].startDate = e.target.value;
                                onSave({...userData, experience: updatedExperience});
                              }}
                              className="w-full border border-gray-300 rounded-md p-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                              type="date"
                              value={exp.endDate && !exp.current ? new Date(exp.endDate).toISOString().split('T')[0] : ''}
                              onChange={(e) => {
                                const updatedExperience = [...userData.experience];
                                updatedExperience[index].endDate = e.target.value;
                                updatedExperience[index].current = false;
                                onSave({...userData, experience: updatedExperience});
                              }}
                              disabled={exp.current}
                              className="w-full border border-gray-300 rounded-md p-2"
                            />
                          </div>
                        </div>
                        <div className="flex items-center mb-3">
                          <input
                            type="checkbox"
                            id={`current-${index}`}
                            checked={exp.current || false}
                            onChange={(e) => {
                              const updatedExperience = [...userData.experience];
                              updatedExperience[index].current = e.target.checked;
                              if (e.target.checked) {
                                updatedExperience[index].endDate = null;
                              }
                              onSave({...userData, experience: updatedExperience});
                            }}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`current-${index}`} className="ml-2 block text-sm text-gray-700">
                            I currently work here
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            value={exp.description || ''}
                            onChange={(e) => {
                              const updatedExperience = [...userData.experience];
                              updatedExperience[index].description = e.target.value;
                              onSave({...userData, experience: updatedExperience});
                            }}
                            rows={3}
                            className="w-full border border-gray-300 rounded-md p-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium mb-3">Add New Experience</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                          type="text"
                          value={newExperience.company}
                          onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                        <input
                          type="text"
                          value={newExperience.position}
                          onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                          type="date"
                          value={newExperience.startDate}
                          onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                          type="date"
                          value={newExperience.endDate}
                          onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value, current: false})}
                          disabled={newExperience.current}
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>
                    <div className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        id="current-new"
                        checked={newExperience.current}
                        onChange={(e) => {
                          setNewExperience({
                            ...newExperience,
                            current: e.target.checked,
                            endDate: e.target.checked ? '' : newExperience.endDate
                          });
                        }}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="current-new" className="ml-2 block text-sm text-gray-700">
                        I currently work here
                      </label>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={newExperience.description}
                        onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <button
                      onClick={handleAddExperience}
                      className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FiPlus className="mr-2" /> Add Experience
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {userData.skills?.map((skill, index) => (
                      <div key={index} className="border rounded-lg p-4 relative">
                        <button 
                          onClick={() => handleRemoveItem('skills', index)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 size={18} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                            <input
                              type="text"
                              value={skill.name || ''}
                              onChange={(e) => {
                                const updatedSkills = [...userData.skills];
                                updatedSkills[index].name = e.target.value;
                                onSave({...userData, skills: updatedSkills});
                              }}
                              className="w-full border border-gray-300 rounded-md p-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                            <select
                              value={skill.level || 'beginner'}
                              onChange={(e) => {
                                const updatedSkills = [...userData.skills];
                                updatedSkills[index].level = e.target.value;
                                onSave({...userData, skills: updatedSkills});
                              }}
                              className="w-full border border-gray-300 rounded-md p-2"
                            >
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="advanced">Advanced</option>
                              <option value="expert">Expert</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium mb-3">Add New Skill</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                        <input
                          type="text"
                          value={newSkill.name}
                          onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                        <select
                          value={newSkill.level}
                          onChange={(e) => setNewSkill({...newSkill, level: e.target.value})}
                          className="w-full border border-gray-300 rounded-md p-2"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="expert">Expert</option>
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={handleAddSkill}
                      className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FiPlus className="mr-2" /> Add Skill
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'social' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLink className="text-gray-400" />
                        </div>
                        <input
                          type="url"
                          value={userData.socialMedia?.linkedIn || ''}
                          onChange={(e) => onSave({
                            ...userData, 
                            socialMedia: {
                              ...userData.socialMedia,
                              linkedIn: e.target.value
                            }
                          })}
                          placeholder="https://linkedin.com/in/username"
                          className="pl-10 w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLink className="text-gray-400" />
                        </div>
                        <input
                          type="url"
                          value={userData.socialMedia?.twitter || ''}
                          onChange={(e) => onSave({
                            ...userData, 
                            socialMedia: {
                              ...userData.socialMedia,
                              twitter: e.target.value
                            }
                          })}
                          placeholder="https://twitter.com/username"
                          className="pl-10 w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLink className="text-gray-400" />
                        </div>
                        <input
                          type="url"
                          value={userData.socialMedia?.github || ''}
                          onChange={(e) => onSave({
                            ...userData, 
                            socialMedia: {
                              ...userData.socialMedia,
                              github: e.target.value
                            }
                          })}
                          placeholder="https://github.com/username"
                          className="pl-10 w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLink className="text-gray-400" />
                        </div>
                        <input
                          type="url"
                          value={userData.website || ''}
                          onChange={(e) => onSave({...userData, website: e.target.value})}
                          placeholder="https://yourwebsite.com"
                          className="pl-10 w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-green-600 rounded-md text-sm font-medium text-white hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};