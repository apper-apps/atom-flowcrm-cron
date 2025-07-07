import { motion } from 'framer-motion';

const Loading = ({ type = 'card' }) => {
  const shimmerVariants = {
    start: {
      backgroundPosition: '-468px 0'
    },
    end: {
      backgroundPosition: '468px 0'
    }
  };

  const shimmerTransition = {
    duration: 1.2,
    repeat: Infinity,
    ease: 'easeInOut'
  };

  if (type === 'table') {
    return (
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"
              variants={shimmerVariants}
              initial="start"
              animate="end"
              transition={shimmerTransition}
              style={{
                backgroundSize: '936px 104px'
              }}
            />
            <div className="flex-1 space-y-2">
              <motion.div
                className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4"
                variants={shimmerVariants}
                initial="start"
                animate="end"
                transition={shimmerTransition}
                style={{
                  backgroundSize: '936px 104px'
                }}
              />
              <motion.div
                className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2"
                variants={shimmerVariants}
                initial="start"
                animate="end"
                transition={shimmerTransition}
                style={{
                  backgroundSize: '936px 104px'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'kanban') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="space-y-4">
            <motion.div
              className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-24"
              variants={shimmerVariants}
              initial="start"
              animate="end"
              transition={shimmerTransition}
              style={{
                backgroundSize: '936px 104px'
              }}
            />
            <div className="space-y-3">
              {[...Array(3)].map((_, cardIndex) => (
                <div key={cardIndex} className="bg-white rounded-lg border border-gray-200 p-4">
                  <motion.div
                    className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 mb-2"
                    variants={shimmerVariants}
                    initial="start"
                    animate="end"
                    transition={shimmerTransition}
                    style={{
                      backgroundSize: '936px 104px'
                    }}
                  />
                  <motion.div
                    className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2 mb-3"
                    variants={shimmerVariants}
                    initial="start"
                    animate="end"
                    transition={shimmerTransition}
                    style={{
                      backgroundSize: '936px 104px'
                    }}
                  />
                  <div className="flex justify-between items-center">
                    <motion.div
                      className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16"
                      variants={shimmerVariants}
                      initial="start"
                      animate="end"
                      transition={shimmerTransition}
                      style={{
                        backgroundSize: '936px 104px'
                      }}
                    />
                    <motion.div
                      className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-8"
                      variants={shimmerVariants}
                      initial="start"
                      animate="end"
                      transition={shimmerTransition}
                      style={{
                        backgroundSize: '936px 104px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
          <motion.div
            className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 mb-4"
            variants={shimmerVariants}
            initial="start"
            animate="end"
            transition={shimmerTransition}
            style={{
              backgroundSize: '936px 104px'
            }}
          />
          <motion.div
            className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2 mb-4"
            variants={shimmerVariants}
            initial="start"
            animate="end"
            transition={shimmerTransition}
            style={{
              backgroundSize: '936px 104px'
            }}
          />
          <div className="space-y-2">
            <motion.div
              className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full"
              variants={shimmerVariants}
              initial="start"
              animate="end"
              transition={shimmerTransition}
              style={{
                backgroundSize: '936px 104px'
              }}
            />
            <motion.div
              className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/3"
              variants={shimmerVariants}
              initial="start"
              animate="end"
              transition={shimmerTransition}
              style={{
                backgroundSize: '936px 104px'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;