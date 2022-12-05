# Production Dockerfile

FROM docker.io/node:alpine as BUILD_IMAGE

# Build ENVS
# ENV TEST=YES

# External deps (for node-gyp add: "python3 make g++")
# git is used to install the npm packages with git deps
# RUN apk add --no-cache git

USER node

WORKDIR /home/node

ADD --chown=node:node package.json package-lock.json ./

# install dependencies
RUN npm ci

# Add project files
ADD --chown=node:node . .

# build
RUN npm run build

# remove dev dependencies
RUN npm ci --omit=dev

# go to another VM
FROM node:alpine AS PROD_IMAGE

# Production ENVS
ENV NODE_ENV=production

USER node

# go to folder
WORKDIR /home/node

# copy from build image
COPY --chown=node:node --from=BUILD_IMAGE /home/node/package.json ./package.json
COPY --chown=node:node --from=BUILD_IMAGE /home/node/dist ./dist
COPY --chown=node:node --from=BUILD_IMAGE /home/node/node_modules ./node_modules

# Expose port
EXPOSE 3000

# run it !
CMD ["npm", "run", "start"]