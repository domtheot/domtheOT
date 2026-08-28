INSERT INTO resources (title, slug, category, description, content, published, featured_link)
VALUES
  (
    'Understanding Sensory Processing in Children',
    'understanding-sensory-processing-in-children',
    'Occupational Therapy',
    'A comprehensive guide for parents to identify and support sensory processing needs at home.',
    'Sensory processing refers to the way the nervous system receives messages from the senses and turns them into responses. For children with sensory processing differences, processing sensory information like sights, sounds, textures, and balance can be challenging. In this guide, we discuss practical home-based strategies such as creating a sensory-friendly space, utilizing heavy work activities, and establishing predictable sensory routines that support daily functioning.',
    TRUE,
    TRUE
  ),
  (
    'Preparing for Your Birth Experience',
    'preparing-for-your-birth-experience',
    'Birth',
    'Empowering steps to help you prepare emotionally, physically, and practically for delivery day.',
    'Preparing for birth involves understanding your options, building a trusted support team, and preparing your body and mind. As your doula, I recommend starting with a flexible birth preferences plan, practicing relaxation breathing techniques, and involving your partner in comfort measures like counterpressure and massage. Remember that birth is a physiological process that unfolds best when you feel safe, supported, and respected.',
    TRUE,
    TRUE
  ),
  (
    'Building Postpartum Routines That Work',
    'building-postpartum-routines-that-work',
    'Postpartum',
    'Practical scheduling and occupational tips for adjustment and recovery during the fourth trimester.',
    'The postpartum period, often called the fourth trimester, is a time of immense physical, emotional, and social transition. To establish healthy routines, prioritize rest, nutrition, and boundaries. From an occupational therapy perspective, we look at pacing daily activities, simplifying household tasks, and structuring routines around baby care and self-care to ensure you recover sustainably and bond deeply with your newborn.',
    TRUE,
    TRUE
  ),
  (
    'Fine Motor Development Milestones',
    'fine-motor-development-milestones',
    'Infant Development',
    'A checklist of hand and finger coordination milestones from birth through preschool age.',
    'Fine motor skills involve the coordination of small muscles in the hands and fingers. Milestones span from early reflex grasping in newborns to building blocks, scribbling, cutting with safety scissors, and buttoning shirts as toddlers grow. We cover what developmental signs to look for and interactive play ideas like playdough, bead-stringing, and pegboards to naturally encourage fine motor strength and finger isolation.',
    FALSE,
    FALSE
  ),
  (
    'What Does a Doula Actually Do?',
    'what-does-a-doula-actually-do',
    'Pregnancy',
    'Demystifying the role of a birth doula, doula support boundaries, and benefits during labor.',
    'A birth doula is a trained professional who provides continuous physical, emotional, and informational support to a mother before, during, and shortly after childbirth. Unlike medical staff, a doula focuses entirely on your comfort, advocacy, and reassurance. Research consistently shows that doula support reduces medical intervention rates, shortens labor times, and significantly improves the mother’s overall birth satisfaction.',
    TRUE,
    TRUE
  )
ON CONFLICT (slug) DO NOTHING;
